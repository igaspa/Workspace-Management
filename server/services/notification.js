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
const {
  notificationTemplate,
  reservation,
  notification,
  workspace,
  user,
  area,
  location
} = require('../database/models');
const { errors } = require('../utils/errors');
const responseMessages = require('../utils/response-messages');

const { ICalCalendar } = require('ical-generator');

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

const createEmail = (emailAddress, emailTemplate, icalObjectInstance) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: emailAddress,
    subject: emailTemplate.title,
    html: emailTemplate.body
  };

  if (icalObjectInstance) {
    const icalContent = icalObjectInstance.toString();

    mailOptions.attachments = [
      {
        filename: 'invitation.ics',
        content: icalContent,
        contentType: 'text/calendar'
      }
    ];
  }

  return mailOptions;
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
      {
        model: workspace,
        attributes: workspaceNotificationAttributes,
        include: [
          {
            model: area,
            include: [{ model: location }]
          }
        ]
      },
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

const sendEmailAndAddNotifToDB = async (email, data, template) => {
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

const createReservationNotification = async (reservation, template, icalObjectInstance) => {
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

  const email = createEmail(reservation.user.email, emailTemplate, icalObjectInstance);

  await sendEmailAndAddNotifToDB(email, notificationData, template);
};

const createReservationParticipantNotification = async (reservation, participant, template) => {
  let emailTemplate = await getNotificationTemplate(template);
  const emailData = {
    userName: `${participant.firstName} ${participant.lastName}`,
    workspaceName: reservation.workspace.name,
    dateTime: reservation.dateTime,
    hostName: `${reservation.user.firstName} ${reservation.user.lastName}`
  };
  const notificationData = {
    reservationId: reservation.id,
    participants: reservation.participants,
    userEmail: participant.email,
    ...emailData
  };
  emailTemplate = personalizeEmailTemplate(emailData, emailTemplate);

  const email = createEmail(participant.email, emailTemplate);

  await sendEmailAndAddNotifToDB(email, notificationData, template);
};

const getIcalObjectInstance = (reservation) => {
  const cal = new ICalCalendar();

  // Create an event
  cal.createEvent({
    start: new Date(reservation.startAt),
    end: new Date(reservation.endAt),
    summary: `${reservation.workspace.name} reservation`,
    location: reservation.workspace.area.location.address,
    organizer: {
      name: `${reservation.user.firstName} ${reservation.user.lastName}`,
      email: reservation.user.email
    },
    attendees: reservation.participants?.length
      ? reservation.participants.map((participant) => {
          return { email: participant.email };
        })
      : null
  });

  return cal;
};

exports.sendReservationEmail = async function (req, ownerTemplate, participantsTemplate, calendarEvent = false) {
  const reservationId = req.params.id || req.body.id;
  const reservation = await findReservation(reservationId);
  const icalObjectInstance = calendarEvent ? getIcalObjectInstance(reservation) : null;

  if (reservation.participants?.length) {
    const participantPromises = reservation.participants.map((participant) => {
      return createReservationParticipantNotification(reservation, participant, participantsTemplate);
    });
    await Promise.all(participantPromises);
  }
  await createReservationNotification(reservation, ownerTemplate, icalObjectInstance);
};

const notifyParticipants = async (reservation, participants, template) => {
  if (!participants || participants.length === 0) return;

  const participantPromises = participants.map((participant) => {
    return createReservationParticipantNotification(reservation, participant, template);
  });

  await Promise.all(participantPromises);
};

exports.sendReservationUpdatedEmail = async function (req) {
  const reservationId = req.params.id;
  const reservation = await findReservation(reservationId);
  const icalObjectInstance = getIcalObjectInstance(reservation);
  const { addedParticipants, removedParticipants, updatedParticipants } = req.body;

  await notifyParticipants(reservation, addedParticipants, notificationTemplates.createdReservationParticipantTemplate);
  await notifyParticipants(
    reservation,
    removedParticipants,
    notificationTemplates.canceledReservationParticipantTemplate
  );
  await notifyParticipants(
    reservation,
    updatedParticipants,
    notificationTemplates.updatedReservationParticipantTemplate
  );

  await createReservationNotification(
    reservation,
    notificationTemplates.updatedReservationTemplate,
    icalObjectInstance
  );
};

const createPasswordCreationEmailTemplateAndSendEmail = async (data, token, template) => {
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

  await sendEmailAndAddNotifToDB(email, dataObject, template);
};

exports.invitationEmail = async function (data, token) {
  await createPasswordCreationEmailTemplateAndSendEmail(data, token, notificationTemplates.userInvitationTemplate);
};

exports.passwordResetEmail = async function (data, token) {
  await createPasswordCreationEmailTemplateAndSendEmail(data, token, notificationTemplates.userPasswordResetTemplate);
};
