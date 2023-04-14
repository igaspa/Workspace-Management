exports.convertToMs = (interval) => {
  const dateInMs = ((interval.hours || 0) * 60 * 60 + (interval.minutes || 0) * 60) * 1000;
  return dateInMs;
};

exports.MINIMUM_RESERVATION_INTERVAL = 300000;

exports.calculateStartDate = (startAt) => {
  return new Date(startAt).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};
exports.calculateEndDate = (endAt) => {
  return new Date(endAt).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};
