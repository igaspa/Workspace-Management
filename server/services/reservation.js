const responseMessage = require('../utils/response-messages');
const { errors } = require('../utils/errors');
const { reservation, workspace, workspaceType, sequelize } = require('../database/models');
const { v4: uuidv4 } = require('uuid');
const { convertToMs, calculateNumOfIntervals } = require('../utils/date-calculation');

const validateReservationStartDate = (reservationStart, intervalInMs, reservationTime) => {
  // Validate reservationStart falls within the specified range
  if (new Date(reservationStart).getTime() + intervalInMs <= new Date().getTime()) {
    throw errors.VALIDATION(responseMessage.MINIMUM_RESERVATION_START_ERROR);
  }

  // calculate the time interval in ms
  const timeIntervalInMs = convertToMs(reservationTime);

  // get reservation start time in ms
  const startDate = {
    hours: new Date(reservationStart).getHours(),
    minutes: new Date(reservationStart).getMinutes()
  };
  const reservationStartInMs = convertToMs(startDate);

  // check if the current time is a valid start time based on the time interval
  if (reservationStartInMs % timeIntervalInMs !== 0) {
    throw errors.VALIDATION(responseMessage.INVALID_RESERVATION_START_TIME);
  }
};

exports.createReservation = async (req, res) => {
  const { userId, workspaceId, reservationStart, reservationEnd, actionId } = req.body;

  // retrive workspace with workspaceType from db to get information abot reservation interval
  const workspaceInfo = await workspace.findOne({
    where: { id: workspaceId },
    include: [{ model: workspaceType }]
  });
  if (!workspaceInfo) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(workspace.name));

  // TO DO
  const participants = workspaceInfo.workspaceType.name === 'Conference Room' ? req.body.participants : null;

  const { reservationTime } = workspaceInfo.workspaceType;
  const intervalInMs = convertToMs(reservationTime);
  const numIntervals = calculateNumOfIntervals(reservationStart, reservationEnd, intervalInMs);
  validateReservationStartDate(reservationStart, intervalInMs, reservationTime);

  // Create the reservations
  const reservations = [];
  const start = new Date(reservationStart);
  for (let i = 0; i < numIntervals; i++) {
    const reservationStartPlusInterval = new Date(start.getTime() + i * intervalInMs);
    const reservationEndPlusInterval = new Date(reservationStartPlusInterval.getTime() + intervalInMs);
    reservations.push({
      id: uuidv4(),
      userId,
      workspaceId,
      reservationStart: reservationStartPlusInterval,
      reservationEnd: reservationEndPlusInterval,
      participants: participants || null,
      actionId
    });
  }
  const transaction = await sequelize.transaction();
  try {
    await reservation.bulkCreate(reservations, { transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
