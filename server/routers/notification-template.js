const express = require('express');
const router = express.Router();

const generalController = require('../controllers/notification-template');
const { roles } = require('../utils/roles');
const { callbackErrorHandler } = require('../middleware/error-handler');
const { bodyValidator, paramValidator } = require('../middleware/joi-validator');
const { authenticateUser, restrictRoles } = require('../middleware/authenticate-user');

router.use(callbackErrorHandler(authenticateUser));

router
  .route('/')
  .get(restrictRoles([roles.administrator]), callbackErrorHandler(generalController.getAllNotificationTemplates))
  .post(restrictRoles([roles.administrator]), bodyValidator, callbackErrorHandler(generalController.createNotificationTemplate));

router
  .route('/:id')
  .get(restrictRoles([roles.administrator]), paramValidator, callbackErrorHandler(generalController.getNotificationTemplate))
  .put(restrictRoles([roles.administrator]), paramValidator, bodyValidator, callbackErrorHandler(generalController.updateNotificationTemplate))
  .delete(restrictRoles([roles.administrator]), paramValidator, callbackErrorHandler(generalController.deleteNotificationTemplate));

module.exports = router;
