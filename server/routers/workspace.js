const { roles } = require('../utils/roles');
const { callbackErrorHandler } = require('../middleware/error-handler');
const { bodyValidator, paramValidator, bodyValidatorAdditionalAttribute } = require('../middleware/joi-validator');
const express = require('express');
const { authenticateUser, restrictRoles } = require('../middleware/authenticate-user');

const workspaceController = require('../controllers/workspace');

const router = express.Router();

router.use(callbackErrorHandler(authenticateUser));

router
  .route('/area/:id')
  .delete(restrictRoles([roles.administrator]), paramValidator, callbackErrorHandler(workspaceController.deleteWorkspacesFromArea));

router
  .route('/location/:id')
  .delete(restrictRoles([roles.administrator]), paramValidator, callbackErrorHandler(workspaceController.deleteWorkspacesFromLocation));

router
  .route('/:id')
  .get(restrictRoles([roles.administrator, roles.employee, roles.lead]), paramValidator, callbackErrorHandler(workspaceController.getWorkspace))
  .put(restrictRoles([roles.administrator]), paramValidator, bodyValidator, callbackErrorHandler(workspaceController.updateWorkspace))
  .delete(restrictRoles([roles.administrator]), paramValidator, callbackErrorHandler(workspaceController.deleteWorkspace));

router
  .route('/collection')
  .post(restrictRoles([roles.administrator]), bodyValidatorAdditionalAttribute, callbackErrorHandler(workspaceController.createWorkspaces));

router
  .route('/delete-collection')
  .post(restrictRoles([roles.administrator]), callbackErrorHandler(workspaceController.deleteMultipleWorkspaces));

router
  .route('/')
  .post(restrictRoles([roles.administrator]), bodyValidator, callbackErrorHandler(workspaceController.createOneWorkspace))
  .get(restrictRoles([roles.administrator, roles.employee, roles.lead]), callbackErrorHandler(workspaceController.getAllWorkspaces));

module.exports = router;
