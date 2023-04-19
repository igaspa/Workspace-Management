const { errors } = require('../../utils/errors');
const responseMessages = require('../../utils/response-messages');
const { convertToMs, MINIMUM_RESERVATION_INTERVAL } = require('../../utils/date-calculation');
const { DateTime } = require('luxon');

const validateDailyMaxLimit = (startInMs, endInMs, maxReservationTimeDailyInMs, userDailyReservationCountInMs) => {
  if ((endInMs - startInMs + userDailyReservationCountInMs) > maxReservationTimeDailyInMs) {
    throw errors.CONFLICT(responseMessages.DAILY_LIMIT_EXCEDEED);
  }
};

const validateOverallMaxLimit = (startInMs, endInMs, maxReservationTimeOverallInMs, userOverallReservationCountInMs) => {
  if ((endInMs - startInMs + userOverallReservationCountInMs) > maxReservationTimeOverallInMs) {
    throw errors.CONFLICT(responseMessages.OVERALL_LIMIT_EXCEDEED);
  }
};

const calculateUserOverallReservationsInMs = (reservations) => {
  const currentTimeInMs = new Date().getTime();
  const totalDurationMs = reservations
    .reduce((totalMs, reservation) => {
      const startMs = reservation.startAt.getTime() < currentTimeInMs ? currentTimeInMs : reservation.startAt.getTime();
      const durationMs = reservation.endAt.getTime() - startMs;
      return totalMs + durationMs;
    }, 0);
  return totalDurationMs || 0;
};

const calculateUserDailyReservationsInMs = (reservations, start) => {
  const reservationStart = new Date(start);
  const midnight = reservationStart.setHours(0, 0, 0, 0);
  const midnightOfTomorrow = reservationStart.setHours(24, 0, 0, 0);
  const totalDurationMs = reservations
    .filter(reservation => reservation.endAt.getTime() > midnight && reservation.startAt.getTime() < midnightOfTomorrow)
    .reduce((totalMs, reservation) => {
      const startMs = reservation.startAt.getTime() < midnight ? midnight : reservation.startAt.getTime();
      const endMs = reservation.endAt.getTime() > midnightOfTomorrow ? midnightOfTomorrow : reservation.endAt.getTime();
      const durationInMs = endMs - startMs;

      return totalMs + durationInMs;
    }, 0);
  return totalDurationMs || 0;
};

const validateReservationsLimits = (reservations, data) => {
  const { startAt, endAt, maxReservationTimeDaily, maxReservationTimeOverall } = data;
  const start = new Date(startAt);
  const end = new Date(endAt);

  const maxReservationTimeDailyInMs = convertToMs(maxReservationTimeDaily);
  const maxReservationTimeOverallInMs = convertToMs(maxReservationTimeOverall);

  const userDailyReservationCountInMs = calculateUserDailyReservationsInMs(reservations, start);
  const userOverallReservationCountInMs = calculateUserOverallReservationsInMs(reservations);

  // validate User did not exceed daily limit of reservations
  validateDailyMaxLimit(start.getTime(), end.getTime(), maxReservationTimeDailyInMs, userDailyReservationCountInMs);

  // validate User did not exceed overall limit of reservations
  validateOverallMaxLimit(start.getTime(), end.getTime(), maxReservationTimeOverallInMs, userOverallReservationCountInMs);
};

exports.validateMinimumReservationInterval = (start, end) => {
  // check if start and end are valid times based on the interval
  const startInMs = start.getTime();
  const endInMs = end.getTime();
  if (startInMs % MINIMUM_RESERVATION_INTERVAL || endInMs % MINIMUM_RESERVATION_INTERVAL) {
    throw errors.VALIDATION(responseMessages.INVALID_RESERVATION_INTERVAL);
  }
};

exports.validateReservationConstraints = (reservations, data) => {
  // validate user does not have permanent reservation
  const { startAt, endAt } = data;

  // Create date objects fromd dates
  const start = new Date(startAt);
  const end = new Date(endAt);

  if (reservations.some(reservation => reservation.endAt === null)) {
    throw errors.CONFLICT(responseMessages.PERMANENT_RESERVATION_CONFLICT);
  }

  // validate there are no overlaps between existing reservations and the new one
  // this is also handled on db
  const overlappingReservation = reservations.find(reservation => {
    const reservationStart = reservation.startAt;
    const reservationEnd = reservation.endAt;

    return start < reservationEnd && end > reservationStart;
  });
  if (overlappingReservation) throw errors.CONFLICT(responseMessages.OVERLAP_RESERVATION_CONFLICT);

  // validate user did not exceed daily or overall reservation limit
  validateReservationsLimits(reservations, data);
};
