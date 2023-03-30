const { callbackErrorHandler } = require('../middleware/error-handler');
const express = require('express');

const workingSpaceController = require('../controllers/working-space');

const router = express.Router();

router
  .route('/')
  .post(callbackErrorHandler(workingSpaceController.createWorkingSpace))
  .get(callbackErrorHandler(workingSpaceController.getAllWorkingSpaces));

router
  .route('/:id')
  .get(callbackErrorHandler(workingSpaceController.getWorkingSpace))
  .put(callbackErrorHandler(workingSpaceController.updateWorkingSpace))
  .delete(callbackErrorHandler(workingSpaceController.deleteWorkingSpace));

module.exports = router;
