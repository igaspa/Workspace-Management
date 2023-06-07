const { user } = require('../database/models');
const generalController = require('./general');
const { searchByTerm } = require('../utils/filter');
const userService = require('../services/user');
const notification = require('../services/notification');

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
  // create user in DB
  await userService.userCreation(req.body);

  // send invite email to user
  await notification.invitationEmail(req.body);

  res.json({ message: 'Invitation successfully sent!' });
};

module.exports.updateUser = async (req, res) => {
  await generalController.updateModel(user, req, res);
};

module.exports.deleteUser = async (req, res) => {
  await generalController.deleteModel(user, req, res);
};

module.exports.createPassword = async (req, res) => {
  await userService.createPassword(req);
  res.json({ message: 'aa' });
};
