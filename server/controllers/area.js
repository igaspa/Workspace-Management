const { area } = require('../database/models');
const generalController = require('./general');
const areaService = require('../services/area');
const { searchByTerm } = require('../utils/filter');

module.exports.getAllAreas = async (req, res) => {
  const { name } = req.query;
  const searchedTerm = name ? searchByTerm(name) : searchByTerm(0);
  if (name?.length < 3) {
    res.status(200).json([]);
  } else if (!searchedTerm) {
    await generalController.findAllModels(area, null, req, res);
  } else {
    const query = {
      where: [{ name: searchedTerm }]
    };
    await generalController.findAllModels(area, query, req, res);
  }
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
