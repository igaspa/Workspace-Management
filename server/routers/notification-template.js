const express = require('express');

const generalController = require('../controllers/notification-template');
const { callbackErrorHandler } = require('../middleware/error-handler');
const { bodyValidator, paramValidator } = require('../middleware/joi-validator');

const router = express.Router();

router
  .route('/')
  .get(callbackErrorHandler(generalController.getAllNotificationTemplates))
  .post(bodyValidator, callbackErrorHandler(generalController.createNotificationTemplate));

router
  .route('/:id')
  .get(paramValidator, callbackErrorHandler(generalController.getNotificationTemplate))
  .put(paramValidator, bodyValidator, callbackErrorHandler(generalController.updateNotificationTemplate))
  .delete(paramValidator, callbackErrorHandler(generalController.deleteNotificationTemplate));

module.exports = router;
