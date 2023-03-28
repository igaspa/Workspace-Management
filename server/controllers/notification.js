const { notification } = require('../database/models');
const generalController = require('./general');

module.exports.getAllNotification = async (req, res) => {
  await generalController.findAllModels(notification, null, req, res);
};

module.exports.getNotification = async (req, res) => {
  await generalController.findModel(notification, null, req, res);
};

module.exports.deleteNotification = async (req, res) => {
  await generalController.deleteModel(notification, req, res);
};
