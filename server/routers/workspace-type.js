
const { callbackErrorHandler } = require('../middleware/error-handler');
const { bodyValidator, paramValidator } = require('../middleware/joi-validator');

const express = require('express');

const workspaceTypeController = require('../controllers/workspace-type');

const router = express.Router();

router
  .route('/')
  .get(callbackErrorHandler(workspaceTypeController.getAllWorkspaceTypes))
  .post(bodyValidator, callbackErrorHandler(workspaceTypeController.createWorkspaceType));

router
  .route('/:id')
  .get(paramValidator, callbackErrorHandler(workspaceTypeController.getWorkspaceType))
  .put(paramValidator, bodyValidator, callbackErrorHandler(workspaceTypeController.updateWorkspaceType))
  .delete(paramValidator, callbackErrorHandler(workspaceTypeController.deleteWorkspaceType));

module.exports = router;
