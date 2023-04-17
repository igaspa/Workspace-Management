const { area } = require('../database/models');
const generalController = require('./general');
const areaService = require('../services/area');

module.exports.getAllAreas = async (req, res) => {
  await generalController.findAllModels(area, null, req, res);
};

module.exports.getArea = async (req, res) => {
  await generalController.findOneModel(area, null, req, res);
};

module.exports.createArea = async (req, res) => {
  await generalController.createModel(area, req, res);
};

module.exports.updateArea = async (req, res) => {
  await generalController.updateModel(area, req, res);
};

module.exports.deleteArea = async (req, res) => {
  await areaService.deleteArea(req, res);
};
