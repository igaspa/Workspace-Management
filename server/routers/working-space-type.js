
const { callbackErrorHandler } = require('../middleware/error-handler');
const { bodyValidator, paramValidator } = require('../middleware/joiValidator');

const express = require('express');

const workingSpaceTypeController = require('../controllers/working-space-type');

const router = express.Router();

router
  .route('/')
  .get(callbackErrorHandler(workingSpaceTypeController.getAllWorkingSpaceTypes))
  .post(bodyValidator, callbackErrorHandler(workingSpaceTypeController.createWorkingSpaceType));

router
  .route('/:id')
  .get(paramValidator, callbackErrorHandler(workingSpaceTypeController.getWorkingSpaceType))
  .put(paramValidator, bodyValidator, callbackErrorHandler(workingSpaceTypeController.updateWorkingSpaceType))
  .delete(paramValidator, callbackErrorHandler(workingSpaceTypeController.deleteWorkingSpaceType));

module.exports = router;
