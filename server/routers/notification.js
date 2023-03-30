const express = require('express');

const generalController = require('../controllers/notification');
const { callbackErrorHandler } = require('../middleware/error-handler');
const { paramValidator } = require('../middleware/joiValidator');

const router = express.Router();

router
  .route('/')
  .get(callbackErrorHandler(generalController.getAllNotification));

router
  .route('/:id')
  .get(paramValidator, callbackErrorHandler(generalController.getNotification))
  .delete(paramValidator, callbackErrorHandler(generalController.deleteNotification));

module.exports = router;
