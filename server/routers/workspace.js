const { callbackErrorHandler } = require('../middleware/error-handler');
const { bodyValidator, paramValidator, workspaceCollection } = require('../middleware/joi-validator');
const express = require('express');

const workspaceController = require('../controllers/workspace');

const router = express.Router();

router
  .route('/')
  .post(bodyValidator, callbackErrorHandler(workspaceController.createOneWorkspace))
  .get(callbackErrorHandler(workspaceController.getAllWorkspaces));

router
  .route('/:id')
  .get(paramValidator, callbackErrorHandler(workspaceController.getWorkspace))
  .put(paramValidator, bodyValidator, callbackErrorHandler(workspaceController.updateWorkspace))
  .delete(paramValidator, callbackErrorHandler(workspaceController.deleteWorkspace));

router
  .route('/collection')
  .post(workspaceCollection, callbackErrorHandler(workspaceController.createWorkspaces));

module.exports = router;
