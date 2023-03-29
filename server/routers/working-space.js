const { callbackErrorHandler } = require('../middleware/error-handler');
const express = require('express');
// const { workingSpace } = require('../database/models');

const workingSpaceController = require('../controllers/working-space');

const router = express.Router();

router.post('/collection', callbackErrorHandler(workingSpaceController.createMultipleWorkingSpaces));

router
  .route('/')
  .get(callbackErrorHandler(workingSpaceController.getAllWorkingSpaces))
  .post(callbackErrorHandler(workingSpaceController.createWorkingSpace));

router
  .route('/:id')
  .get(callbackErrorHandler(workingSpaceController.getWorkingSpace))
  .put(callbackErrorHandler(workingSpaceController.updateWorkingSpace))
  .delete(callbackErrorHandler(workingSpaceController.deleteWorkingSpace));

module.exports = router;
