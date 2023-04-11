const jwt = require('jsonwebtoken');
const { errors } = require('../utils/errors');
const responseMessages = require('../utils/response-messages');

exports.authenticateUser = async (req, _res, next) => {
  if (!req.headers.authorization) throw errors.UNAUTHORIZED(responseMessages.MISSING_AUTHORIZATION);
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  if (!token) throw errors.UNAUTHORIZED(responseMessages.INVALID_TOKEN);
  const decodedToken = jwt.verify(token, process.env.TOKEN);
  req.user = decodedToken;
  next();
};

// Verify role of logged user
exports.restrictRoles = (allowedRoles) => {
  return (req, _res, next) => {
    for (const role of allowedRoles) {
      if (req.user.roles.includes(role)) {
        return next();
      }
    }
    throw errors.UNAUTHORIZED(responseMessages.INVALID_ACCESS);
  };
};
