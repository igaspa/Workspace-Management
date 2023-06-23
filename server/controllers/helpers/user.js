const { user } = require('../../database/models');
const { errors } = require('../../utils/errors');
const responseMessages = require('../../utils/response-messages');
const crypto = require('crypto');
const { DateTime } = require('luxon');

exports.generateToken = () => {
  const value = crypto.randomBytes(20).toString('hex');
  const expirationTime = DateTime.now().plus({ minutes: process.env.TOKEN_EXPIRATION_MINUTES });
  return { value, expirationTime };
};

exports.findUserByEmail = async (email, passwordMustNotExist = false) => {
  const existingUser = await user.findOne({
    where: {
      email
    }
  });

  // Validate user exists in DB
  if (!existingUser) throw errors.NOT_FOUND(responseMessages.NOT_FOUND(user.name));

  if (passwordMustNotExist && existingUser.password) {
    // Account is already activated, if user password is not null
    throw errors.CONFLICT(responseMessages.ACCOUNT_ALREADY_ACTIVATED);
  }
};
