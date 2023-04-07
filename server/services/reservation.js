const responseMessage = require('../utils/response-messages');
const { errors } = require('../utils/errors');
const { reservation, workspace, workspaceType, sequelize } = require('../database/models');
const { v4: uuidv4 } = require('uuid');
const { convertToMs, calculateNumOfIntervals } = require('../utils/date-calculation');
const { conferenceRoomId } = require('../utils/constants');

const validateReservationDate = (reservationStart, reservationEnd) => {
  // Validate reservationStart falls within the specified range
  // if (new Date(reservationStart).getTime() + intervalInMs <= new Date().getTime()) {
  //   throw errors.VALIDATION(responseMessage.MINIMUM_RESERVATION_START_ERROR);
  // }

  if (new Date(reservationStart).getTime() <= new Date().getTime()) {
    throw errors.VALIDATION(responseMessage.MINIMUM_RESERVATION_START_ERROR);
  }

  // calculate the time interval in ms
  // const timeIntervalInMs = convertToMs(reservationTime);

  // get reservation start time in ms
  const startDate = {
    hours: new Date(reservationStart).getHours(),
    minutes: new Date(reservationStart).getMinutes()
  };
  const endDate = {
    hours: new Date(reservationEnd).getHours(),
    minutes: new Date(reservationEnd).getMinutes()
  };
  const reservationStartInMs = convertToMs(startDate);
  const reservationEndInMs = convertToMs(endDate);

  const interval = {
    hours: 0,
    minutes: 5
  };
  convertToMs(interval);

  // check if the current time is a valid start time based on the time interval
  if (reservationStartInMs % interval || reservationEndInMs % interval) {
    throw errors.VALIDATION(responseMessage.INVALID_RESERVATION_START_TIME);
  }

  // check if the current time is a valid start time based on the time interval
  // if (reservationStartInMs % timeIntervalInMs !== 0) {
  //   throw errors.VALIDATION(responseMessage.INVALID_RESERVATION_START_TIME);
  // }
};

exports.createReservation = async (req) => {
  const { id, userId, workspaceId, startAt, endAt } = req.body;

  // retrive workspace with workspaceType from db to get information abot reservation interval
  const workspaceInfo = await workspace.findOne({
    where: { id: workspaceId },
    include: [{ model: workspaceType }]
  });
  if (!workspaceInfo) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(workspace.name));

  // TO DO
  const participants = workspaceInfo.workspaceType.id === conferenceRoomId ? req.body.participants : null;

  // const { reservationTime } = workspaceInfo.workspaceType;
  // const intervalInMs = convertToMs(reservationTime);
  // const numIntervals = calculateNumOfIntervals(reservationStart, reservationEnd, intervalInMs);
  // validateReservationDate(reservationStart, intervalInMs, reservationTime);
  validateReservationDate(startAt, endAt);

  // Create the reservations
  // const reservations = [];
  const start = new Date(startAt);
  const end = new Date(endAt);

  await reservation.create({
    id,
    userId,
    workspaceId,
    startAt: start,
    endAt: end,
    participants: participants || null
  });

  // Previous logic for creating reservation
  // for (let i = 0; i < numIntervals; i++) {
  //   const reservationStartPlusInterval = new Date(start.getTime() + i * intervalInMs);
  //   const reservationEndPlusInterval = new Date(reservationStartPlusInterval.getTime() + intervalInMs);
  //   reservations.push({
  //     id,
  //     userId,
  //     workspaceId,
  //     reservationStart: reservationStartPlusInterval,
  //     reservationEnd: reservationEndPlusInterval,
  //     participants: participants || null
  //   });
  // }
  // const transaction = await sequelize.transaction();
  // try {
  //   await reservation.bulkCreate(reservations, { transaction });
  //   await transaction.commit();
  // } catch (error) {
  //   await transaction.rollback();
  //   throw error;
  // }
};

exports.updateReservation = async (req, res) => {
  // const { startAt, endAt } = req.body;
  const { id } = req.params;

  // retrive workspace with workspaceType from db to get information abot reservation interval
  const currentReservaiton = await reservation.findOne({
    where: { id }
  });
  if (!currentReservaiton) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(workspace.name));

  // sort reservations by reservationStart
  // reservations.sort((a, b) => new Date(a.reservationStart) - new Date(b.reservationStart));

  // TO DO
  // const participants = workspaceInfo.workspaceType.id === conferenceRoomId ? req.body.participants : null;

  return res.status(200).json({
    message: currentReservaiton
  });
};
