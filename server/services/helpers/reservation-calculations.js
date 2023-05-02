const { errors } = require('../../utils/errors');
const responseMessages = require('../../utils/response-messages');
const { MINIMUM_RESERVATION_MINUTES, convertDateToMinutes } = require('../../utils/date-calculation');
const { DateTime, Duration } = require('luxon');

const validateMaxReservationIntervalLimit = (data) => {
  const { startAt, endAt, maxReservationInterval } = data;
  console.log(maxReservationInterval);
  const startDate = DateTime.fromISO(startAt);
  const endDate = DateTime.fromISO(endAt);
  const intervalDuration = Duration.fromObject(maxReservationInterval);

  if (endDate.diff(startDate) > intervalDuration) {
    throw errors.BAD_REQUEST(responseMessages.MAX_RESERVATION_INTERVAL_EXCEDEED);
  }
};

const validateMaxReservationWindowLimit = (data) => {
  const { startAt, maxReservationWindow } = data;
  const startDate = DateTime.fromISO(startAt).toLocal();
  const maxDate = DateTime.local()
    .plus({ days: maxReservationWindow.days })
    .endOf('day');

  if (startDate > maxDate) {
    throw errors.BAD_REQUEST(responseMessages.MAX_RESERVATION_WINDOW_EXCEDEED);
  }
};

exports.validateReservationTimeIntervals = (start, end) => {
  const startDate = DateTime.fromISO(start);
  const endDate = DateTime.fromISO(end);

  const startMinutes = convertDateToMinutes(startDate);
  const endMinutes = convertDateToMinutes(endDate);

  if ((startMinutes % MINIMUM_RESERVATION_MINUTES) || (endMinutes % MINIMUM_RESERVATION_MINUTES)) {
    throw errors.BAD_REQUEST(responseMessages.INVALID_RESERVATION_TIME);
  }
};

const validateSameDayStartAndEnd = (startDate, endDate) => {
  if (endDate.toFormat('HH:mm') === '00:00') {
    endDate = endDate.minus({ days: 1 }).startOf('day');
  }

  if (startDate.startOf('day') < endDate.startOf('day')) {
    throw errors.BAD_REQUEST(responseMessages.INVALID_RESERVATION_TIME_RANGE);
  }
};

const validateOverlappingReservations = (reservations, start, end) => {
  const overlappingReservation = reservations.find(reservation => {
    const reservationStart = reservation.startAt;
    const reservationEnd = reservation.endAt;

    return start < reservationEnd && end > reservationStart;
  });
  if (overlappingReservation) throw errors.CONFLICT(responseMessages.OVERLAP_RESERVATION_CONFLICT);
};

exports.validateReservationConstraints = (reservations, data) => {
  const { startAt, endAt, maxReservationInterval, maxReservationWindow } = data;

  // validate user does not have permanent reservation
  if (reservations.some(reservation => reservation.endAt === null)) {
    throw errors.CONFLICT(responseMessages.PERMANENT_RESERVATION_CONFLICT);
  }

  // user must not have 2 reservations for same workspaceType which overlap
  validateOverlappingReservations(reservations, new Date(startAt), new Date(endAt));

  // validate both dates belong to the same day
  validateSameDayStartAndEnd(DateTime.fromISO(startAt), DateTime.fromISO(endAt));

  // validate reservation does not exceed maximum reservation interval
  if (maxReservationInterval) validateMaxReservationIntervalLimit(data);

  // validate reservation does not exceed maximum reservation window
  if (maxReservationWindow) validateMaxReservationWindowLimit(data);
};
