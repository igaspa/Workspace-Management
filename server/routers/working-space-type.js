
const { callbackErrorHandler } = require('../middleware/error-handler');
const express = require('express');

const workingSpaceTypeController = require('../controllers/working-space-type');

const router = express.Router();

router
  .route('/')
  .get(callbackErrorHandler(workingSpaceTypeController.getAllWorkingSpaceTypes))
  .post(callbackErrorHandler(workingSpaceTypeController.createWorkingSpaceType));

router
  .route('/:id')
  .get(callbackErrorHandler(workingSpaceTypeController.getWorkingSpaceType))
  .put(callbackErrorHandler(workingSpaceTypeController.updateWorkingSpaceType))
  .delete(callbackErrorHandler(workingSpaceTypeController.deleteWorkingSpaceType));

module.exports = router;
