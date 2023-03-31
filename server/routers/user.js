const express = require('express');

const generalController = require('../controllers/user');
const { paramValidator, bodyValidator } = require('../middleware/joi-validator');

const { callbackErrorHandler } = require('../middleware/error-handler');

const router = express.Router();

router
  .route('/')
  .get(callbackErrorHandler(generalController.getAllUsers))
  .post(bodyValidator, callbackErrorHandler(generalController.createUser));

router
  .route('/:id')
  .get(paramValidator, callbackErrorHandler(generalController.getUser))
  .put(paramValidator, bodyValidator, callbackErrorHandler(generalController.updateUser))
  .delete(paramValidator, callbackErrorHandler(generalController.deleteUser));

module.exports = router;
