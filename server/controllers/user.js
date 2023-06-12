const { user } = require('../database/models');
const generalController = require('./general');
const { searchByTerm } = require('../utils/filter');
const userService = require('../services/user');
const notification = require('../services/notification');
const responseMessages = require('../utils/response-messages');
const { generateToken, findAndValidateUser } = require('./helpers/user');

module.exports.getAllUsers = async (req, res) => {
  const { email } = req.query;
  if (email?.length < 3) {
    res.status(200).json([]);
  } else if (!email) {
    await generalController.findAllModels(user, null, req, res);
  } else {
    const searchedTerm = searchByTerm(email);
    const query = {
      where: [{ email: searchedTerm }]
    };
    await generalController.findAllModels(user, query, req, res);
  }
};

module.exports.getUser = async (req, res) => {
  await generalController.findOneModel(user, null, req, res);
};

module.exports.createUser = async (req, res) => {
  // create token
  const token = generateToken();

  // create user in DB
  await userService.createNewUser(req.body, token);

  // send invite email to user
  await notification.invitationEmail(req.body, token);

  res.json({ message: 'Invitation successfully sent!' });
};

module.exports.reinviteUser = async (req, res) => {
  const { email } = req.body;
  await findAndValidateUser(email);

  // create token
  const token = generateToken();

  // update user and retrieve new data
  const updatedUser = await userService.updateUserToken(email, token);

  // send invite email to user
  await notification.invitationEmail(updatedUser, token.value);

  res.json({ message: responseMessages.INVITATION_SENT });
};

module.exports.updateUser = async (req, res) => {
  await userService.updateUser(req);
  res.status(200).json({ message: responseMessages.UPDATE_SUCCESS(user.name) });
};

module.exports.deleteUser = async (req, res) => {
  await generalController.deleteModel(user, req, res);
};

module.exports.createPassword = async (req, res) => {
  await userService.createPassword(req);
  res.json({ message: responseMessages.PASSWORD_CREATED });
};
