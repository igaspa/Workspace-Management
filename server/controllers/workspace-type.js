const { workspaceType } = require('../database/models');
const generalController = require('./general');

module.exports.getAllWorkspaceTypes = async (req, res) => {
  await generalController.findAllModels(workspaceType, null, req, res);
};

module.exports.getWorkspaceType = async (req, res) => {
  await generalController.findOneModel(workspaceType, null, req, res);
};

module.exports.createWorkspaceType = async (req, res) => {
  await generalController.createModel(workspaceType, req, res);
};

module.exports.updateWorkspaceType = async (req, res) => {
  await generalController.updateModel(workspaceType, req, res);
};

module.exports.deleteWorkspaceType = async (req, res) => {
  await generalController.deleteModel(workspaceType, req, res);
};
