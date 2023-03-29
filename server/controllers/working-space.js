const workingSpaceService = require('../services/working-space');
const responseMessage = require('../utils/response-messages');
const { workingSpace } = require('../database/models');
const generalController = require('./general');

exports.createMultipleWorkingSpaces = async (req, res) => {
  await workingSpaceService.createWorkingSpaces(req);
  return res.status(201).json({
    message: responseMessage.CREATE_SUCCESS
  });
};

module.exports.getAllWorkingSpaces = async (req, res) => {
  await generalController.findAllModels(workingSpace, null, req, res);
};

module.exports.getWorkingSpace = async (req, res) => {
  await generalController.findOneModel(workingSpace, null, req, res);
};

module.exports.createWorkingSpace = async (req, res) => {
  await generalController.createModel(workingSpace, req, res);
};

module.exports.updateWorkingSpace = async (req, res) => {
  await generalController.updateModel(workingSpace, req, res);
};

module.exports.deleteWorkingSpace = async (req, res) => {
  await generalController.deleteModel(workingSpace, req, res);
};
