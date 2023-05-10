const { equipment } = require('../database/models');
const generalController = require('./general');

module.exports.getAllEquipments = async (req, res) => {
  await generalController.findAllModels(equipment, null, req, res);
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
