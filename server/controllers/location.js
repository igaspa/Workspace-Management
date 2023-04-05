const { location } = require('../database/models');
const generalController = require('./general');
const workspaceService = require('../services/workspace');

module.exports.getAllLocations = async (req, res) => {
  await generalController.findAllModels(location, null, req, res);
};

module.exports.getLocation = async (req, res) => {
  await generalController.findOneModel(location, null, req, res);
};

module.exports.createLocation = async (req, res) => {
  await generalController.createModel(location, req, res);
};

module.exports.updateLocation = async (req, res) => {
  await generalController.updateModel(location, req, res);
};

module.exports.deleteLocation = async (req, res) => {
  await workspaceService.deleteAreasFromLocation(req);
  await generalController.deleteModel(location, req, res);
};
