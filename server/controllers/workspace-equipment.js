const { workspaceEquipment } = require('../database/models');
const generalController = require('./general');
const { errors } = require('../utils/errors');
const responseMessage = require('../utils/response-messages');

module.exports.getAllWorkspaceEquipments = async (req, res) => {
  await generalController.findAllModels(workspaceEquipment, null, req, res);
};

module.exports.getWorkspaceEquipments = async (req, res) => {
  const { workspaceId, equipmentId } = req.params;
  const query = {
    where: { workspaceId, equipmentId }
  };

  const model = await workspaceEquipment.findOne(query);
  if (!model) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(model));
  res.status(200).json(model);
};

module.exports.createWorkspaceEquipment = async (req, res) => {
  await generalController.createModel(workspaceEquipment, req, res);
};

module.exports.deleteWorkspaceEquipment = async (req, res) => {
  const { workspaceId, equipmentId } = req.params;
  const model = await workspaceEquipment.destroy({ where: { workspaceId, equipmentId } });
  if (!model) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(model));
  res.status(200).json(model);
};
