const express = require('express');
const router = express.Router();

const generalController = require('../controllers/workspace-equipment');
const { roles } = require('../utils/roles');
const { paramValidator, bodyValidator } = require('../middleware/joi-validator');
const { restrictRoles, authenticateUser } = require('../middleware/authenticate-user');
const { callbackErrorHandler } = require('../middleware/error-handler');

router.use(callbackErrorHandler(authenticateUser));

router
  .route('/')
  .get(restrictRoles([roles.administrator]), callbackErrorHandler(generalController.getAllWorkspaceEquipments))
  .post(restrictRoles([roles.administrator]), bodyValidator, callbackErrorHandler(generalController.createWorkspaceEquipment));

router
  .route('/:workspaceId/:equipmentId')
  .get(restrictRoles([roles.administrator]), paramValidator, callbackErrorHandler(generalController.getWorkspaceEquipments))
  .delete(restrictRoles([roles.administrator]), paramValidator, callbackErrorHandler(generalController.deleteWorkspaceEquipment));

module.exports = router;
