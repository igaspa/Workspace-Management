const { user, sequelize, userRole } = require('../database/models');
const { errors } = require('../utils/errors');
const responseMessages = require('../utils/response-messages');
const bcrypt = require('bcrypt');
const { TOKEN_EXPIRATION } = require('../utils/constants');

const saveUserToDB = async (data, token, transaction) => {
  await user.create(
    {
      ...data,
      token: token.value,
      tokenExpirationTime: TOKEN_EXPIRATION
    },
    { transaction }
  );
};

const saveUserRoleToDB = async (data, transaction) => {
  const { addedRoles, id } = data;

  const promises = addedRoles.map((roleId) => {
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

const removeUserRole = async (roleList, transaction, userId) => {
  const promises = roleList.map((role) => {
    return userRole.destroy({ where: { userId, roleId: role } }, { transaction }).then((deletedModel) => {
      if (!deletedModel) throw errors.NOT_FOUND(responseMessages.NOT_FOUND(userRole.name));
    });
  });

  await Promise.all(promises);
};

exports.updateUser = async (req) => {
  const { body, params } = req;
  const { addedRoles, removedRoles } = body;

  try {
    transaction = await sequelize.transaction();

    if (addedRoles?.length) await saveUserRoleToDB({ addedRoles, id: params.id }, transaction);

    if (removedRoles?.length) await removeUserRole(removedRoles, transaction, params.id);

    // delete body elements that do not belong to user model
    delete body.addedRoles;
    delete body.removedRoles;

    // update user with the rest of body data
    if (Object.keys(body).length) {
      const [updatedModel, _updatedData] = await user.update(
        body,
        {
          where: { id: params.id },
          returning: true
        },
        { transaction }
      );
      if (!updatedModel) throw errors.NOT_FOUND(responseMessages.NOT_FOUND(user.name));
    }
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
