const responseMessage = require('../utils/response-messages');
const { errors } = require('../utils/errors');
const { reservation, workspace, workspaceType } = require('../database/models');
const { convertToMs, MILISECONDS_IN_DAY, MINIMUM_RESERVATION_INTERVAL } = require('../utils/date-calculation');
const { CONFERENCE_ROOM_ID } = require('../utils/constants');
const { Op } = require('sequelize');
const { roles } = require('../utils/roles');

const validateDailyMaxLimit = (startInMs, endInMs, maxReservationTimeDailyInMs, userDailyReservationCountInMs) => {
  if ((endInMs - startInMs + userDailyReservationCountInMs) > maxReservationTimeDailyInMs) {
    throw errors.CONFLICT(responseMessage.DAILY_LIMIT_EXCEDEED);
  }
};

const validateOverallMaxLimit = (startInMs, endInMs, maxReservationTimeOverallInMs, userOverallReservationCountInMs) => {
  if ((endInMs - startInMs + userOverallReservationCountInMs) > maxReservationTimeOverallInMs) {
    throw errors.CONFLICT(responseMessage.OVERALL_LIMIT_EXCEDEED);
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
  const reservationStart = new Date(start);
  const midnight = reservationStart.setHours(0, 0, 0, 0);
  const midnightOfTomorrow = midnight + MILISECONDS_IN_DAY;
  const totalDurationMs = reservations
    .filter(reservation => reservation.endAt.getTime() > midnight && reservation.startAt.getTime() < midnightOfTomorrow)
    .reduce((totalMs, reservation) => {
      const startMs = reservation.startAt.getTime() < midnight ? midnight : reservation.startAt.getTime();
      const endMs = reservation.endAt.getTime() > midnightOfTomorrow ? midnightOfTomorrow : reservation.endAt.getTime();
      const durationInMs = endMs - startMs;

      return totalMs + durationInMs;
    }, 0);
  return totalDurationMs || 0;
}

const validateMinimumReservationInterval = (start, end) => {
  // check if start and end are valid times based on the interval
  const startInMs = start.getTime();
  const endInMs = end.getTime();
  if (startInMs % MINIMUM_RESERVATION_INTERVAL || endInMs % MINIMUM_RESERVATION_INTERVAL) {
    throw errors.VALIDATION(responseMessage.INVALID_RESERVATION_INTERVAL);
  }
};

const validateReservationsLimits = (reservations, data) => {
  const { start, end, maxReservationTimeDaily, maxReservationTimeOverall } = data;

  const maxReservationTimeDailyInMs = convertToMs(maxReservationTimeDaily);
  const maxReservationTimeOverallInMs = convertToMs(maxReservationTimeOverall);

  const userDailyReservationCountInMs = calculateUserDailyReservationsInMs(reservations, start);
  const userOverallReservationCountInMs = calculateUserOverallReservationsInMs(reservations);

  // validate User did not exceed daily limit of reservations
  const dayAfter = new Date(start.getTime() + MILISECONDS_IN_DAY);
  const midnight = dayAfter.setHours(0, 0, 0, 0);
  if (end.getTime() > midnight) {
    validateDailyMaxLimit(start.getTime(), midnight, maxReservationTimeDailyInMs, userDailyReservationCountInMs);
  } else {
    validateDailyMaxLimit(start.getTime(), end.getTime(), maxReservationTimeDailyInMs, userDailyReservationCountInMs);
  }

  // validate User did not exceed overall limit of reservations
  validateOverallMaxLimit(start.getTime(), end.getTime(), maxReservationTimeOverallInMs, userOverallReservationCountInMs);
};

const validateReservationConstraints = (reservations, data) => {
  // validate user does not have permanent reservation
  const { start, end } = data;
  if (reservations.some(reservation => reservation.workspace.permanentlyReserved)) {
    throw errors.CONFLICT(responseMessage.PERMANENT_RESERVATION_CONFLICT);
  }

  // validate there are no overlaps between existing reservations and the new one
  const overlappingReservation = reservations.find(reservation => {
    const reservationStart = reservation.startAt;
    const reservationEnd = reservation.endAt;
    return (
      (start >= reservationStart && start < reservationEnd) ||
      (end > reservationStart && end <= reservationEnd) ||
      (start <= reservationStart && end >= reservationEnd)
    );
  });

  if (overlappingReservation) throw errors.CONFLICT(responseMessage.OVERLAP_RESERVATION_CONFLICT);

  // validate user did not exceed daily or overall reservation limit
  validateReservationsLimits(reservations, data);
};

const getUserReservationsByWorkspaceType = async (userId, workspaceTypeId) => {
  const reservations = await reservation.findAll({
    where: {
      userId,
      [Op.or]: [
        { endAt: { [Op.gt]: new Date() } },
        { endAt: null }
      ]
    },
    attributes: ['startAt', 'endAt'],
    include: [{
      model: workspace,
      where: { typeId: workspaceTypeId },
      attributes: ['permanentlyReserved'],
      include: [{
        model: workspaceType,
        attributes: []
      }]
    }],
    order: [['startAt', 'ASC']]
  });

  return reservations;
};

exports.createReservation = async (req) => {
  const { id, userId, workspaceId, startAt, endAt } = req.body;

  // retrive workspace with workspaceType from db to get information abot reservation interval
  const workspaceInfo = await workspace.findOne({
    where: { id: workspaceId },
    attributes: [],
    include: [{ model: workspaceType, attributes: ['id', 'maxReservationTimeDaily', 'maxReservationTimeOverall'] }]
  });
  if (!workspaceInfo) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(workspace.name));

  const { maxReservationTimeDaily, maxReservationTimeOverall, id: workspaceTypeId } = workspaceInfo.workspaceType;

  const reservations = await getUserReservationsByWorkspaceType(userId, workspaceTypeId);

  const start = new Date(startAt);
  const end = new Date(endAt);

  const data = { start, end, maxReservationTimeDaily, maxReservationTimeOverall };
  const userRoles = req.user.roles;
  if (!userRoles.includes(roles.administrator || roles.lead)) {
    validateReservationConstraints(reservations, data);
  }

  // Create date objects corresponding to the dates that were sent
  validateMinimumReservationInterval(start, end);

  // Create the reservation
  const participants = workspaceInfo.workspaceType.id === CONFERENCE_ROOM_ID ? req.body.participants : null;
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
