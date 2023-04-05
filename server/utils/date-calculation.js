const { errors } = require('../utils/errors');
const responseMessage = require('../utils/response-messages');

exports.convertToMs = (date) => {
  const dateInMs = ((date.hours || 0) * 60 * 60 + (date.minutes || 0) * 60) * 1000;
  return dateInMs;
};

exports.calculateNumOfIntervals = (start, end, intervalInMs) => {
  const numIntervals = ((new Date(end).setSeconds(0) - new Date(start).setSeconds(0)) / intervalInMs);
  if (!Number.isInteger(numIntervals) || numIntervals < 1) throw errors.VALIDATION(responseMessage.MINIMUM_RESERVATION_TIME_ERROR);
  return numIntervals;
};
