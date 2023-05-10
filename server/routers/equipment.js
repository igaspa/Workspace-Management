const express = require('express');
const router = express.Router();

const generalController = require('../controllers/equipment');
const { roles } = require('../utils/roles');
const { bodyValidator, paramValidator } = require('../middleware/joi-validator');
const { callbackErrorHandler } = require('../middleware/error-handler');
const { restrictRoles, authenticateUser } = require('../middleware/authenticate-user');

router.use(callbackErrorHandler(authenticateUser));

router
  .route('/')
  .get(restrictRoles([roles.administrator, roles.lead, roles.employee]), callbackErrorHandler(generalController.getAllEquipments))
  .post(restrictRoles([roles.administrator]), bodyValidator, callbackErrorHandler(generalController.createEquipment));

router
  .route('/:id')
  .get(restrictRoles([roles.administrator, roles.employee, roles.lead]), paramValidator, callbackErrorHandler(generalController.getEquipment))
  .put(restrictRoles([roles.administrator]), paramValidator, bodyValidator, callbackErrorHandler(generalController.updateEquipment))
  .delete(restrictRoles([roles.administrator]), paramValidator, callbackErrorHandler(generalController.deleteEquipment));

module.exports = router;
