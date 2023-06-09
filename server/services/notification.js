const nodemailer = require('nodemailer');
const cache = require('../utils/cache');
const { v4: uuidv4 } = require('uuid');
const {
  notificationStatus,
  userNotificationAttributes,
  workspaceNotificationAttributes,
  notificationTemplates,
  NOTIFICATION_KEY
} = require('../utils/constants');
const { notificationTemplate, reservation, notification, workspace, user } = require('../database/models');
const { errors } = require('../utils/errors');
const responseMessages = require('../utils/response-messages');

exports.setNotificationTemplate = async () => {
  try {
    const key = NOTIFICATION_KEY;
    const notificationTemplateEntity = await notificationTemplate.findAll();
    cache.setCache(key, notificationTemplateEntity);
  } catch (error) {
    console.log(error);
  }
};

const getNotificationTemplate = async function (notificationTemplateId) {
  const cacheNotificationTemplate = await cache.getCache(NOTIFICATION_KEY);
  let template = null;
  if (!cacheNotificationTemplate) {
    template = await notificationTemplate.findOne({
      where: { id: notificationTemplateId }
    });
  } else {
    template = cacheNotificationTemplate.find((item) => item.id === notificationTemplateId);
  }
  return template;
};

const sendEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  transporter.sendMail(email, function (error, _info) {
    if (error) {
      console.log(error);
    }
  });
};

const createEmail = (emailAddress, emailTemplate) => {
  const email = {
    from: process.env.EMAIL,
    to: emailAddress,
    subject: emailTemplate.title,
    html: emailTemplate.body
  };
  return email;
};

const personalizeEmailTemplate = function (mailData, emailTemplate) {
  const personalEmailTemplate = emailTemplate.template;
  Object.keys(mailData).forEach((el) => {
    personalEmailTemplate.body = personalEmailTemplate.body.replace(`{${el}}`, mailData[el]);
  });
  return personalEmailTemplate;
};

const findReservation = async (reservationId) => {
  const currentReservation = await reservation.findOne({
    where: {
      id: reservationId
    },
    paranoid: false,
    include: [
      { model: workspace, attributes: workspaceNotificationAttributes },
      { model: user, attributes: userNotificationAttributes }
    ]
  });
  if (!currentReservation) throw errors.NOT_FOUND(responseMessages.NOT_FOUND(reservation.name));
  return currentReservation;
};

const addNotificationToDB = async (notificationInfo) => {
  await notification.create({
    id: uuidv4(),
    notificationTemplateId: notificationInfo.template,
    status: notificationInfo.status,
    data: notificationInfo.data,
    createdAt: new Date(),
    updatedAt: new Date()
  });
};

const createAndSendEmail = async (email, data, template) => {
  try {
    await sendEmail(email);
    await addNotificationToDB({
      template: template,
      status: notificationStatus.sent,
      data
    });
  } catch (error) {
    console.log(error);
    await addNotificationToDB({
      template: template,
      status: notificationStatus.failed,
      data
    });
  }
};

const createReservationNotification = async (reservation, template) => {
  let emailTemplate = await getNotificationTemplate(template);
  const emailData = {
    userName: `${reservation.user.firstName} ${reservation.user.lastName}`,
    workspaceName: reservation.workspace.name,
    dateTime: reservation.dateTime
  };

  const notificationData = {
    reservationId: reservation.id,
    participants: reservation.participants,
    userEmail: reservation.user.email,
    ...emailData
  };
  emailTemplate = personalizeEmailTemplate(emailData, emailTemplate);

  const email = createEmail(reservation.user.email, emailTemplate);

  await createAndSendEmail(email, notificationData, template);
};

const createReservationParticipantNotification = async (reservation, participant, template) => {
  let emailTemplate = await getNotificationTemplate(template);
  const emailData = {
    userName: `${participant.firstName} ${participant.lastName}`,
    workspaceName: reservation.workspace.name,
    dateTime: reservation.dateTime,
    hostName:  `${reservation.user.firstName} ${reservation.user.lastName}`
  };
  const notificationData = {
  reservationId: reservation.id,
  participants: reservation.participants,
  userEmail: participant.email,
  ...emailData
  }
  emailTemplate = personalizeEmailTemplate(emailData, emailTemplate);

  const email = createEmail(participant.email, emailTemplate);

  await createAndSendEmail(email, notificationData, template);
};

exports.sendReservationCreatedEmail = async function (req) {
  const reservationId = req.body.id;
  const reservation = await findReservation(reservationId);
  if(reservation.participants.length){
    reservation.participants.forEach(participant =>{
      createReservationParticipantNotification(reservation, participant, notificationTemplates.createdReservationInvitationTemplate)
    })
  }
  await createReservationNotification(reservation, notificationTemplates.createdReservationTemplate);
};

exports.sendReservationUpdatedEmail = async function (req) {
  const reservationId = req.params.id;
  const reservation = await findReservation(reservationId);

  await createReservationNotification(reservation, notificationTemplates.updatedReservationTemplate);
};

exports.sendReservationCanceledEmail = async function (req) {
  const reservationId = req.params.id;
  const reservation = await findReservation(reservationId);
  if(reservation.participants.length){
    reservation.participants.forEach(participant =>{
      createReservationParticipantNotification(reservation, participant, notificationTemplates.canceledReservationParticipantTemplate)
    })
  }
  await createReservationNotification(reservation, notificationTemplates.canceledReservationTemplate);
};

const createInvitationEmailTemplateAndSendEmail = async (data, token, template) => {
  let emailTemplate = await getNotificationTemplate(template);
  const baseURL = process.env.REACT_APP_BASE_URL;
  const emailData = {
    userName: `${data.firstName} ${data.lastName}`,
    link: `${baseURL}/user/password-create?token=${token.value}`
  };

  emailTemplate = personalizeEmailTemplate(emailData, emailTemplate);
  const email = createEmail(data.email, emailTemplate);

  const dataObject = {
    email: data.email
  };

  await createAndSendEmail(email, dataObject, template);
};

exports.invitationEmail = async function (data, token) {
  await createInvitationEmailTemplateAndSendEmail(data, token, notificationTemplates.userInvitationTemplate);
};
