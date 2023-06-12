const { user, sequelize, userRole } = require('../database/models');
const { errors } = require('../utils/errors');
const responseMessages = require('../utils/response-messages');
const bcrypt = require('bcrypt');

const saveUserToDB = async (data, token, transaction) => {
  await user.create(
    {
      ...data,
      token: token.value,
      tokenExpirationTime: token.expirationTime
    },
    { transaction }
  );
};

const saveUserRoleToDB = async (data, transaction) => {
  const { roles, id } = data;

  const promises = roles.map((roleId) => {
    return userRole.create(
      {
        roleId,
        userId: id
      },
      { transaction }
    );
  });

  await Promise.all(promises);
};

exports.createNewUser = async (userData, token) => {
  const transaction = await sequelize.transaction();
  try {
    await saveUserToDB(userData, token, transaction);

    await saveUserRoleToDB(userData, transaction);

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
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
