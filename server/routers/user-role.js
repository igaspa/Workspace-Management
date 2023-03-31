const express = require('express');

const generalController = require('../controllers/user-role');
const { paramValidator, bodyValidator } = require('../middleware/joi-validator');

const { callbackErrorHandler } = require('../middleware/error-handler');

const router = express.Router();

router
  .route('/')
  .get(callbackErrorHandler(generalController.getAllUserRoles))
  .post(bodyValidator, callbackErrorHandler(generalController.createUserRole));

router
  .route('/:firstId/:secondId')
  .get(paramValidator, callbackErrorHandler(generalController.getUserRoles))
  .delete(paramValidator, callbackErrorHandler(generalController.deleteUserRole));

module.exports = router;
