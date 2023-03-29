const { workingSpaceType } = require('../database/models');
const generalController = require('./general');

module.exports.getAllWorkingSpaceTypes = async (req, res) => {
  await generalController.findAllModels(workingSpaceType, null, req, res);
};

module.exports.getWorkingSpaceType = async (req, res) => {
  await generalController.findOneModel(workingSpaceType, null, req, res);
};

module.exports.createWorkingSpaceType = async (req, res) => {
  await generalController.createModel(workingSpaceType, req, res);
};

module.exports.updateWorkingSpaceType = async (req, res) => {
  await generalController.updateModel(workingSpaceType, req, res);
};

module.exports.deleteWorkingSpaceType = async (req, res) => {
  await generalController.deleteModel(workingSpaceType, req, res);
};
