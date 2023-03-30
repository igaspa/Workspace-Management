const { callbackErrorHandler } = require('../middleware/error-handler');
const { bodyValidator, paramValidator } = require('../middleware/joiValidator');
const express = require('express');

const workingSpaceController = require('../controllers/working-space');

const router = express.Router();

router
  .route('/')
  .get(callbackErrorHandler(workingSpaceController.getAllWorkingSpaces))
  .post(bodyValidator, callbackErrorHandler(workingSpaceController.createWorkingSpace));

router
  .route('/:id')
  .get(paramValidator, callbackErrorHandler(workingSpaceController.getWorkingSpace))
  .put(paramValidator, bodyValidator, callbackErrorHandler(workingSpaceController.updateWorkingSpace))
  .delete(paramValidator, callbackErrorHandler(workingSpaceController.deleteWorkingSpace));

module.exports = router;
