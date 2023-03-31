const { callbackErrorHandler } = require('../middleware/error-handler');
const { bodyValidator, paramValidator, workingSpaceCollection } = require('../middleware/joi-validator');
const express = require('express');

const workingSpaceController = require('../controllers/working-space');

const router = express.Router();

router
  .route('/')
  .post(bodyValidator, callbackErrorHandler(workingSpaceController.createOneWorkingSpace))
  .get(callbackErrorHandler(workingSpaceController.getAllWorkingSpaces));

router
  .route('/:id')
  .get(paramValidator, callbackErrorHandler(workingSpaceController.getWorkingSpace))
  .put(paramValidator, bodyValidator, callbackErrorHandler(workingSpaceController.updateWorkingSpace))
  .delete(paramValidator, callbackErrorHandler(workingSpaceController.deleteWorkingSpace));

router
  .route('/collection')
  .post(workingSpaceCollection, callbackErrorHandler(workingSpaceController.createWorkingSpaces));

module.exports = router;
