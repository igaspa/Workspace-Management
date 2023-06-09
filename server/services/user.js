const { user } = require('../database/models');
const { errors } = require('../utils/errors');
const responseMessages = require('../utils/response-messages');
const bcrypt = require('bcrypt');

exports.createNewUser = async (userData, token) => {
  await user.create({
    ...userData,
    token: token.value,
    tokenExpirationTime: token.expirationTime
  });
};

exports.updateUserToken = async (email, token) => {
  const [_updatedModel, updatedData] = await user.update(
    {
      token: token.value,
      tokenExpirationTime: token.expirationTime
    },
    {
      where: { email },
      returning: true
    }
  );
  return updatedData[0].dataValues;
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
