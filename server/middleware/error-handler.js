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

  return res.status(500).json({ message: 'Internal server error' });
};
