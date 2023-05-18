exports.MINIMUM_RESERVATION_MINUTES = 5;

exports.convertDateToMinutes = (date) => {
  return date.hour * 60 + date.minute;
};

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
