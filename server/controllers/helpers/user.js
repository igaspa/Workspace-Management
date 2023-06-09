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

exports.findUserByEmail = async (email) => {
  const existingUser = await user.findOne({
    where: {
      email
    }
  });

  // if user does not exist throw an error
  if (!existingUser) throw errors.NOT_FOUND(responseMessages.NOT_FOUND(user.name));
};
