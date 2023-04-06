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
  if (reservationStartInMs % interval !== 0 || reservationEndInMs % interval !== 0) {
    throw errors.VALIDATION(responseMessage.INVALID_RESERVATION_START_TIME);
  }

  // check if the current time is a valid start time based on the time interval
  // if (reservationStartInMs % timeIntervalInMs !== 0) {
  //   throw errors.VALIDATION(responseMessage.INVALID_RESERVATION_START_TIME);
  // }
};

exports.createReservation = async (req) => {
  const { id, userId, workspaceId, reservationStart, reservationEnd } = req.body;

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
  validateReservationDate(reservationStart, reservationEnd);

  // Create the reservations
  // const reservations = [];
  const start = new Date(reservationStart);
  const end = new Date(reservationEnd);

  await reservation.create({
    id,
    userId,
    workspaceId,
    start,
    end,
    participants: participants || null
  });
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
  const { reservationStart, reservationEnd, actionId } = req.body;

  // retrive workspace with workspaceType from db to get information abot reservation interval
  const reservations = await reservation.findAll({
    where: { actionId },
    order: [['reservationStart', 'ASC']]
  });
  if (!reservations) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(workspace.name));

  // sort reservations by reservationStart
  // reservations.sort((a, b) => new Date(a.reservationStart) - new Date(b.reservationStart));

  console.log(reservations);

  // TO DO
  // const participants = workspaceInfo.workspaceType.id === conferenceRoomId ? req.body.participants : null;

  return res.status(200).json({
    message: reservations
  });
};
