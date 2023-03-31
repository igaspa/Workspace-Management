const { role } = require('../database/models');
const generalController = require('./general');

module.exports.getAllRoles = async (req, res) => {
  await generalController.findAllModels(role, null, req, res);
};

module.exports.getRole = async (req, res) => {
  await generalController.findOneModel(role, null, req, res);
};

module.exports.createRole = async (req, res) => {
  await generalController.createModel(role, req, res);
};

module.exports.updateRole = async (req, res) => {
  await generalController.updateModel(role, req, res);
};

module.exports.deleteRole = async (req, res) => {
  await generalController.deleteModel(role, req, res);
};
