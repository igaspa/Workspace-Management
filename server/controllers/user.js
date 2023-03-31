const { user } = require('../database/models');
const generalController = require('./general');

module.exports.getAllUsers = async (req, res) => {
  await generalController.findAllModels(user, null, req, res);
};

module.exports.getUser = async (req, res) => {
  await generalController.findOneModel(user, null, req, res);
};

module.exports.createUser = async (req, res) => {
  await generalController.createModel(user, req, res);
};

module.exports.updateUser = async (req, res) => {
  await generalController.updateModel(user, req, res);
};

module.exports.deleteUser = async (req, res) => {
  await generalController.deleteModel(user, req, res);
};
