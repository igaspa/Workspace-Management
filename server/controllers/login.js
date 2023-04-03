const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user, userRole } = require('../database/models');
const { errors } = require('../utils/errors');
const responseMessages = require('../utils/response-messages');

const signToken = (id, firstName, lastName, email, roles) => {
  const token = jwt.sign(
    { id, firstName, lastName, email, roles },
    process.env.TOKEN
  );
  return token;
};

const createToken = async (user, _req, res) => {
  const userRoles = await userRole.findAll({
    where: {
      userId: user.id
    },
    attributes: ['roleId']
  });
  const roles = userRoles.map(el => el.roleId);
  const token = signToken(user.id, user.firstName, user.lastName, user.email, roles);
  res.status(200).json({ token });
};

const comparePassword = async (enteredPassword, dbPassword) => {
  return await bcrypt.compare(enteredPassword, dbPassword);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const currentUser = await user.findOne({ where: { email } });
  if (!currentUser) {
    throw errors.NOT_FOUND(currentUser);
  }
  if (await comparePassword(password, currentUser.password) === false) {
    throw errors.UNAUTHORIZED(responseMessages.LOGIN_AUTHORIZATION_ERROR);
  };

  createToken(currentUser, req, res);
};
