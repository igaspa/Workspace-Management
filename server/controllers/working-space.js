const workspaceService = require('../services/working-space');
const responseMessage = require('../utils/response-messages');
const { workspace } = require('../database/models');
const generalController = require('./general');

exports.createWorkspaces = async (req, res) => {
  await workspaceService.createMultipleWorkspaces(req);
  return res.status(201).json({
    message: responseMessage.CREATE_SUCCESS(workspace.name)
  });
};

exports.createOneWorkspace = async (req, res) => {
  await generalController.createModel(workspace, req, res);
};

module.exports.getAllWorkspaces = async (req, res) => {
  await generalController.findAllModels(workspace, null, req, res);
};

module.exports.getWorkspace = async (req, res) => {
  await generalController.findOneModel(workspace, null, req, res);
};

module.exports.updateWorkspace = async (req, res) => {
  await generalController.updateModel(workspace, req, res);
};

module.exports.deleteWorkspace = async (req, res) => {
  await generalController.deleteModel(workspace, req, res);
};

module.exports.deleteWorkspacesFromArea = async (req, res) => {
  // TO DO
};
