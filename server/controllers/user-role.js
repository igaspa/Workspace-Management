const { userRole } = require('../database/models');
const generalController = require('./general');
const { errors } = require('../utils/errors');
const responseMessage = require('../utils/response-messages');

module.exports.getAllUserRoles = async (req, res) => {
  await generalController.findAllModels(userRole, null, req, res);
};

module.exports.getUserRoles = async (req, res) => {
  const { firstId, secondId } = req.params;
  const query = {
    where: { userId: firstId, roleId: secondId }
  };

  const model = await userRole.findOne(query);
  if (!model) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(model));
  res.status(200).json(model);
};

module.exports.createUserRole = async (req, res) => {
  await generalController.createModel(userRole, req, res);
};

module.exports.deleteUserRole = async (req, res) => {
  const { firstId, secondId } = req.params;
  const model = await userRole.destroy({ where: { userId: firstId, roleId: secondId } });
  if (!model) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(model));
  res.status(200).json(model);
};
