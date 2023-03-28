const express = require('express');

const generalController = require('../controllers/notification');
const { callbackErrorHandler } = require('../middleware/error-handler');

const router = express.Router();

router
  .route('/')
  .get(callbackErrorHandler(generalController.getAllNotification));

router
  .route('/:id')
  .get(callbackErrorHandler(generalController.getNotification))
  .delete(callbackErrorHandler(generalController.deleteNotification));

module.exports = router;
