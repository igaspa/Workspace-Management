const express = require('express');
const router = express.Router();

const generalController = require('../controllers/notification');
const { roles } = require('../utils/roles');
const { callbackErrorHandler } = require('../middleware/error-handler');
const { paramValidator } = require('../middleware/joi-validator');
const { authenticateUser, restrictRoles } = require('../middleware/authenticate-user');

router.use(callbackErrorHandler(authenticateUser));

router
  .route('/')
  .get(restrictRoles([roles.administrator]), callbackErrorHandler(generalController.getAllNotification));

router
  .route('/:id')
  .get(restrictRoles([roles.administrator]), paramValidator, callbackErrorHandler(generalController.getNotification))
  .delete(restrictRoles([roles.administrator]), paramValidator, callbackErrorHandler(generalController.deleteNotification));

module.exports = router;
