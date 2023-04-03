const workspaceService = require('../services/workspace');
const responseMessage = require('../utils/response-messages');
const { workspace } = require('../database/models');
const generalController = require('./general');
const { errors } = require('../utils/errors');

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
  const deletedWorkSpaces = await workspaceService.deleteWorkspacesFromArea(req);

  if (!deletedWorkSpaces) throw errors.NOT_FOUND(workspace.name + 's');
  return res.status(200).json({
    message: responseMessage.DELETE_SUCCESS(workspace.name + 's')
  });
};

module.exports.deleteWorkspacesFromLocation = async (req, res) => {
  const deletedWorkSpaces = await workspaceService.deleteWorkspacesFromLocation(req);

  if (!deletedWorkSpaces) throw errors.NOT_FOUND(workspace.name + 's');
  return res.status(200).json({
    message: responseMessage.DELETE_SUCCESS(workspace.name + 's')
  });
};
