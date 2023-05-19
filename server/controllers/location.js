const { location } = require('../database/models');
const generalController = require('./general');
const locationService = require('../services/location');
const { searchByTerm } = require('../utils/filter');

module.exports.getAllLocations = async (req, res) => {
  const { address } = req.query;
  if (address?.length < 3) {
    res.status(200).json([]);
  } else if (!address) {
    await generalController.findAllModels(location, null, req, res);
  } else {
    const searchedTerm = searchByTerm(address);
    const query = {
      where: [{ address: searchedTerm }]
    };
    await generalController.findAllModels(location, query, req, res);
  }
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
  await locationService.deleteLocation(req, res);
};
