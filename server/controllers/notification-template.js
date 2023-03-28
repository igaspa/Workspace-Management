const { notificationTemplate } = require('../database/models');
const generalController = require('./general');

module.exports.getAllNotificationTemplates = async (req, res) => {
  await generalController.findAllModels(notificationTemplate, null, req, res);
};

module.exports.getNotificationTemplate = async (req, res) => {
  await generalController.findModel(notificationTemplate, null, req, res);
};

module.exports.createNotificationTemplate = async (req, res) => {
  const [model] = await notificationTemplate.upsert(req.body, {
    where: { id: req.params.id },
    returning: true
  });
  // TODO Add template to cache
  res.status(200).json(model);
};
module.exports.deleteNotificationTemplate = async (req, res) => {
  await generalController.deleteModel(notificationTemplate, req, res);
};
