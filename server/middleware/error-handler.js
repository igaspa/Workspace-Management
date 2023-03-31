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
    const data = error.errors.map(err => err.path);
    const elements = data.length <= 2
      ? data.join(' and ')
      : `${data.slice(0, -1).join(', ')}, and ${data[data.length - 1]}`;
    return res.status(422).json({ message: responseMessage.UNIQUE_CONSTRAINT_ERROR(elements) });
  }

  return res.status(500).json({ message: 'Internal server error' });
};
