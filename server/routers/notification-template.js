const express = require('express');

const generalController = require('../controllers/notification-template');
const { callbackErrorHandler } = require('../middleware/error-handler');

const router = express.Router();

router
  .route('/')
  .get(callbackErrorHandler(generalController.getAllNotificationTemplates))
  .post(callbackErrorHandler(generalController.createNotificationTemplate));

router
  .route('/:id')
  .get(callbackErrorHandler(generalController.getNotificationTemplate))
  .delete(callbackErrorHandler(generalController.deleteNotificationTemplate));

module.exports = router;