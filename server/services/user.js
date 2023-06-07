const { user, sequelize } = require('../database/models');
const crypto = require('crypto');
const { DateTime } = require('luxon');
const { errors } = require('../utils/errors');
const responseMessages = require('../utils/response-messages');
const bcrypt = require('bcrypt');

const createNewUser = async (userData, token, tokenExpirationTime) => {
  await user.create({
    ...userData,
    token,
    tokenExpirationTime
  });
};

const updateUserToken = async (data, userEmail) => {
  const [_updatedModel, _updatedData] = await user.update(data, {
    where: { email: userEmail },
    returning: true
  });
};

exports.userCreation = async (data) => {
  const token = crypto.randomBytes(20).toString('hex');
  const tokenExpirationTime = DateTime.now().plus({ minutes: process.env.TOKEN_EXPIRATION_MINUTES });
  const existingUser = await user.findOne({
    where: {
      email: data.email
    }
  });

  // if user does not exist create new one, otherwise update users token
  if (!existingUser) await createNewUser(data, token, tokenExpirationTime);
  else await updateUserToken({ token, tokenExpirationTime }, data.email);
};

const updateUserPassword = async (token, password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  await user.update(
    {
      password: hashedPassword,
      token: null,
      tokenExpirationTime: null
    },
    {
      where: { token }
    }
  );
};

exports.createPassword = async (req) => {
  const { token } = req.query;
  const { password } = req.body;

  const retrievedUser = await user.findOne({
    where: { token }
  });
  if (!retrievedUser) throw errors.VALIDATION(responseMessages.INVALID_CREATION_TOKEN);

  if (new Date(retrievedUser.tokenExpirationTime) < new Date()) {
    throw errors.VALIDATION(responseMessages.ACTIVATION_TOKEN_EXPIRED);
  }

  await updateUserPassword(token, password);
};
