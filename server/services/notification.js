const nodemailer = require('nodemailer');
const cache = require('../utils/cache');
const { notificationStatus, userNotificationAttributes, workspaceNotificationAttributes, notificationTemplates } = require('../utils/constants');
const { notificationTemplate, reservation, notification, workspace, user } = require('../database/models');
const { errors } = require('../utils/errors');
const responseMessages = require('../utils/response-messages');
const NOTIFICATION_KEY = 'notificationTemplate';

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
  if (cacheNotificationTemplate === undefined) {
    template = await notificationTemplate.findOne({
      where: { id: notificationTemplateId }
    });
  } else {
    template = cacheNotificationTemplate.find(item => item.id === notificationTemplateId);
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
  Object.keys(mailData).forEach(el => {
    personalEmailTemplate.body = personalEmailTemplate.body.replace(`{${el}}`, mailData[el]);
  });
  return personalEmailTemplate;
};

exports.sendReservationCreatedEmail = async function (req) {
  const reservationId = req.body.id;

  const currentReservation = await reservation.findOne({
    where: {
      id: reservationId
    },
    include: [{ model: workspace, attributes: workspaceNotificationAttributes }, { model: user, attributes: userNotificationAttributes }]
  });
  if (!currentReservation) throw errors.NOT_FOUND(responseMessages.NOT_FOUND(reservation));

  let emailTemplate = await getNotificationTemplate(notificationTemplates.createdReservationTemplate);
  const emailData = {
    userName: `${currentReservation.user.firstName} ${currentReservation.user.lastName}`,
    workspaceName: currentReservation.workspace.name,
    dateTime: currentReservation.dateTime
  };
  emailTemplate = personalizeEmailTemplate(emailData, emailTemplate);

  const email = createEmail(currentReservation.user.email, emailTemplate);
  try {
    await sendEmail(email);
    await notification.create({
      notificationTemplateId: notificationTemplates.createdReservationTemplate,
      reservationId,
      status: notificationStatus.sent,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  } catch (error) {
    console.log(error);
    await notification.create({
      notificationTemplateId: notificationTemplates.createdReservationTemplate,
      reservationId,
      status: notificationStatus.failed,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
};

exports.sendReservationUpdatedEmail = async function (req) {
  const reservationId = req.params.id;

  const currentReservation = await reservation.findOne({
    where: {
      id: reservationId
    },
    include: [{ model: workspace, attributes: workspaceNotificationAttributes }, { model: user, attributes: userNotificationAttributes }]
  });
  if (!currentReservation) throw errors.NOT_FOUND(responseMessages.NOT_FOUND(reservation));

  let emailTemplate = await getNotificationTemplate(notificationTemplates.updatedReservationTemplate);
  const emailData = {
    userName: `${currentReservation.user.firstName} ${currentReservation.user.lastName}`,
    workspaceName: currentReservation.workspace.name,
    dateTime: currentReservation.dateTime
  };
  emailTemplate = personalizeEmailTemplate(emailData, emailTemplate);

  const email = createEmail(currentReservation.user.email, emailTemplate);
  try {
    await sendEmail(email);
    await notification.create({
      notificationTemplateId: notificationTemplates.updatedReservationTemplate,
      reservationId,
      status: notificationStatus.sent,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  } catch (error) {
    console.log(error);
    await notification.create({
      notificationTemplateId: notificationTemplates.updatedReservationTemplate,
      reservationId,
      status: notificationStatus.failed,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
};
