const { roles } = require('../utils/roles');
const { callbackErrorHandler } = require('../middleware/error-handler');
const { bodyValidator, paramValidator } = require('../middleware/joi-validator');
const { authenticateUser, restrictRoles } = require('../middleware/authenticate-user');

const express = require('express');

const workspaceTypeController = require('../controllers/workspace-type');

const router = express.Router();

router.use(callbackErrorHandler(authenticateUser));

router
  .route('/')
  .get(restrictRoles([roles.administrator, roles.lead, roles.employee]), callbackErrorHandler(workspaceTypeController.getAllWorkspaceTypes))
  .post(restrictRoles([roles.administrator]), bodyValidator, callbackErrorHandler(workspaceTypeController.createWorkspaceType));

router
  .route('/:id')
  .get(restrictRoles([roles.administrator, roles.lead, roles.employee]), paramValidator,
    callbackErrorHandler(workspaceTypeController.getWorkspaceType))
  .put(restrictRoles([roles.administrator]), paramValidator, bodyValidator, callbackErrorHandler(workspaceTypeController.updateWorkspaceType))
  .delete(restrictRoles([roles.administrator]), paramValidator, callbackErrorHandler(workspaceTypeController.deleteWorkspaceType));

module.exports = router;
