const { equipment } = require('../database/models');
const generalController = require('./general');
const { searchByTerm } = require('../utils/filter');

module.exports.getAllEquipments = async (req, res) => {
  const { name } = req.query;
  const searchedTerm = name ? searchByTerm(name) : searchByTerm(0);
  if (name?.length < 3) {
    res.status(200).json([]);
  } else if (!searchedTerm) {
    await generalController.findAllModels(equipment, null, req, res);
  } else {
    const query = {
      where: [{ name: searchedTerm }]
    };
    await generalController.findAllModels(equipment, query, req, res);
  }
};

module.exports.getEquipment = async (req, res) => {
  await generalController.findOneModel(equipment, null, req, res);
};

module.exports.createEquipment = async (req, res) => {
  await generalController.createModel(equipment, req, res);
};

module.exports.updateEquipment = async (req, res) => {
  await generalController.updateModel(equipment, req, res);
};

module.exports.deleteEquipment = async (req, res) => {
  await generalController.deleteModel(equipment, req, res);
};
