exports.convertToMs = (interval) => {
  const dateInMs = ((interval.hours || 0) * 60 * 60 + (interval.minutes || 0) * 60) * 1000;
  return dateInMs;
};

exports.MILISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

exports.MINIMUM_RESERVATION_INTERVAL = 300000;
