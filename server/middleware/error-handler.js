const responseMessage = require('../utils/response-messages');
module.exports.callbackErrorHandler = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

class ApiError extends Error {
  constructor (message, statusCode, details) {
    super(message);

    this.statusCode = statusCode;
    this.details = details;
  }
}
module.exports.ApiError = ApiError;

const createSequelizeConstraintErrorMessage = (error) => {
  const tableName = error.parent.table.replace(/_/g, ' ');
  const tableCapitalized = tableName.charAt(0).toUpperCase() + tableName.slice(1);
  const data = error.errors.map(err => `"${err.path}"`);
  const elements = data.length <= 2
    ? data.join(' and ')
    : `${data.slice(0, -1).join(', ')}, and ${data[data.length - 1]}`;

  const obj = {
    table: tableCapitalized,
    elements
  };

  return obj;
};

module.exports.errorMiddleware = async (error, _req, res, _next) => {
  if (error instanceof ApiError) {
    return res
      .status(error.statusCode)
      .json({
        message: error.message,
        details: error.details
      });
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    const messageObj = createSequelizeConstraintErrorMessage(error);
    return res.status(422).json({ message: responseMessage.UNIQUE_CONSTRAINT_ERROR(messageObj) });
  }

  if (error.original?.constraint === 'overlapping_reservation') {
    return res.status(422).json({ message: responseMessage.RESERVATION_UNIQUE_CONSTRAINT_ERROR });
  }

  if (error.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(422).json({ message: error.parent.detail });
  }

  return res.status(500).json({ message: 'Please try again later, we are facing an issue on our side.' });
};
