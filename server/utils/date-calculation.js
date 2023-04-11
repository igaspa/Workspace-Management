exports.convertToMs = (interval) => {
  const dateInMs = ((interval.hours || 0) * 60 * 60 + (interval.minutes || 0) * 60) * 1000;
  return dateInMs;
};


exports.MINIMUM_RESERVATION_INTERVAL = 300000;
