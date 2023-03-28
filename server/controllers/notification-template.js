const { notificationTemplate } = require('../database/models');
const generalController = require('./general');

module.exports.getAllNotificationTemplates = async (req, res) => {
  await generalController.findAllModels(notificationTemplate, null, req, res);
};

module.exports.getNotificationTemplate = async (req, res) => {
  await generalController.findModel(notificationTemplate, null, req, res);
};

module.exports.createNotificationTemplate = async (req, res) => {
  await generalController.createModel(notificationTemplate, req, res);
};

module.exports.updateNotificationTemplate = async (req, res) => {
  await generalController.updateModel(notificationTemplate, req, res);
};

module.exports.deleteNotificationTemplate = async (req, res) => {
  await generalController.deleteModel(notificationTemplate, req, res);
};
