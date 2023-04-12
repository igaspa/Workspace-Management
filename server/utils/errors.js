const { ApiError } = require('../middleware/error-handler');

module.exports.errors = {
  VALIDATION: (details) => new ApiError('Invalid input', 400, details),
  UNAUTHORIZED: (details) => new ApiError('Unauthorized access', 401, details),
  FORBIDDEN: (details) => new ApiError('Forbidden', 403, details),
  NOT_FOUND: (details) => new ApiError('Not found', 404, details),
  CONFLICT: (details) => new ApiError('Conflict in the request', 409, details),
  BAD_REQUEST: (details) => new ApiError('Bad request', 400, details),
  INTERNAL_ERROR: (details) => new ApiError('Server not responding', 500, details)
};
