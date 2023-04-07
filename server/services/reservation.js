const responseMessage = require('../utils/response-messages');
const { errors } = require('../utils/errors');
const { reservation, workspace, workspaceType } = require('../database/models');
const { convertToMs } = require('../utils/date-calculation');
const { conferenceRoomId } = require('../utils/constants');
const { Op } = require('sequelize');

const validateDailyMaxLimit = (startInMs, endInMs, maxReservationTimeDailyInMs, userDailyReservationCountInMs) => {
  if ((endInMs - startInMs + userDailyReservationCountInMs) > maxReservationTimeDailyInMs) {
    throw errors.VALIDATION(responseMessage.DAILY_LIMIT_EXCEDEED);
  }
};

const validateOverallMaxLimit = (startInMs, endInMs, maxReservationTimeOverallInMs, userOverallReservationCountInMs) => {
  if ((endInMs - startInMs + userOverallReservationCountInMs) > maxReservationTimeOverallInMs) {
    throw errors.VALIDATION(responseMessage.OVERALL_LIMIT_EXCEDEED);
  }
};

function calculateUserOverallReservationsInMs (reservations) {
  const currentTimeInMs = new Date().getTime();
  const totalDurationMs = reservations
    .reduce((totalMs, reservation) => {
      const startMs = reservation.startAt.getTime() < currentTimeInMs ? currentTimeInMs : reservation.startAt.getTime();
      const durationMs = reservation.endAt.getTime() - startMs;
      return totalMs + durationMs;
    }, 0);
  return totalDurationMs || 0;
}

function calculateUserDailyReservationsInMs (reservations, start) {
  const midnight = start.setHours(0, 0, 0, 0);
  const midnightOfTomorrow = midnight + (24 * 60 * 60 * 1000);
  const totalDurationMs = reservations
    .filter(reservation => reservation.endAt.getTime() > midnight)
    .reduce((totalMs, reservation) => {
      let durationInMs;
      if (reservation.startAt.getTime() > midnightOfTomorrow) {
        durationInMs = 0;
      } else {
        const startMs = reservation.startAt.getTime() < midnight ? midnight : reservation.startAt.getTime();
        const endMs = reservation.endAt.getTime() > midnightOfTomorrow ? midnightOfTomorrow : reservation.startAt.getTime();
        durationInMs = endMs - startMs;
      }
      return totalMs + durationInMs;
    }, 0);
  return totalDurationMs || 0;
}

const validateReservationTime = (reservations, data) => {
  const { start, end, maxReservationTimeDaily, maxReservationTimeOverall } = data;

  const maxReservationTimeDailyInMs = convertToMs(maxReservationTimeDaily);
  const maxReservationTimeOverallInMs = convertToMs(maxReservationTimeOverall);

  const userDailyReservationCountInMs = calculateUserDailyReservationsInMs(reservations, start);
  const userOverallReservationCountInMs = calculateUserOverallReservationsInMs(reservations);

  // validate user did not exceed daily limit of reservations
  if (
    end.getFullYear() > start.getFullYear() ||
    end.getMonth() > start.getMonth() ||
    end.getDate() > start.getDate()
  ) {
    const dayAfter = new Date(start.getTime() + 24 * 60 * 60 * 1000);
    const midnight = dayAfter.setHours(0, 0, 0, 0);
    validateDailyMaxLimit(start.getTime(), midnight, maxReservationTimeDailyInMs, userDailyReservationCountInMs);
  } else {
    validateDailyMaxLimit(start.getTime(), end.getTime(), maxReservationTimeDailyInMs, userDailyReservationCountInMs);
  }

  // validate user did not exceed overall limit of reservations
  validateOverallMaxLimit(start.getTime(), end.getTime(), maxReservationTimeOverallInMs, userOverallReservationCountInMs);

  const startDateInterval = createIntervalOfDate(start);
  const endDateInterval = createIntervalOfDate(end);
  // convert intervals in ms
  const reservationStartInMs = convertToMs(startDateInterval);
  const reservationEndInMs = convertToMs(endDateInterval);

  const minIntervalObj = {
    minutes: 5
  };
  const miniInterval = convertToMs(minIntervalObj);

  // check if start and end are valid times based on the interval
  if (reservationStartInMs % miniInterval || reservationEndInMs % miniInterval) {
    throw errors.VALIDATION(responseMessage.INVALID_RESERVATION_INTERVAL);
  }
};

const createIntervalOfDate = (date) => {
  const interval = {
    hours: date.getHours(),
    minutes: date.getMinutes()
  };
  return interval;
};

exports.createReservation = async (req) => {
  const { id, userId, workspaceId, startAt, endAt } = req.body;

  // retrive workspace with workspaceType from db to get information abot reservation interval
  const workspaceInfo = await workspace.findOne({
    where: { id: workspaceId },
    attributes: ['permanentlyReserved'],
    include: [{ model: workspaceType, attributes: ['id', 'maxReservationTimeDaily', 'maxReservationTimeOverall'] }]
  });
  if (!workspaceInfo) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(workspace.name));

  const { maxReservationTimeDaily, maxReservationTimeOverall, id: workspaceTypeId } = workspaceInfo.workspaceType;
  console.log(maxReservationTimeDaily, maxReservationTimeOverall, workspaceTypeId);

  const reservations = await reservation.findAll({
    where: {
      userId,
      endAt: { [Op.gt]: new Date() }
    },
    attributes: ['startAt', 'endAt'],
    include: [{
      model: workspace,
      where: { typeId: workspaceTypeId },
      attributes: [],
      include: [{
        model: workspaceType
      }]
    }]
  });

  // for each reservation, if resrvation.start < current date, uzmi start, inace current date

  // Create date objects corresponding to the dates that were sent
  const start = new Date(startAt);
  const end = new Date(endAt);

  const data = { start, end, maxReservationTimeDaily, maxReservationTimeOverall };
  validateReservationTime(reservations, data);

  // return 1;

  // Create the reservation
  const participants = workspaceInfo.workspaceType.id === conferenceRoomId ? req.body.participants : null;
  await reservation.create({
    id,
    userId,
    workspaceId,
    startAt: start,
    endAt: end,
    participants: participants || null
  });
};

exports.updateReservation = async (req, res) => {
  // TO DO
  // const { startAt, endAt } = req.body;
  const { id } = req.params;

  // retrive workspace with workspaceType from db to get information abot reservation interval
  const currentReservaiton = await reservation.findOne({
    where: { id }
  });
  if (!currentReservaiton) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(workspace.name));

  return res.status(200).json({
    message: currentReservaiton
  });
};
