const express = require('express');
const router = express.Router();

const generalController = require('../controllers/role');
const { roles } = require('../utils/roles');
const { paramValidator, bodyValidator } = require('../middleware/joi-validator');
const { callbackErrorHandler } = require('../middleware/error-handler');
const { authenticateUser, restrictRoles } = require('../middleware/authenticate-user');

router.use(callbackErrorHandler(authenticateUser));

router
  .route('/')
  .get(restrictRoles([roles.administrator]), callbackErrorHandler(generalController.getAllRoles))
  .post(restrictRoles([roles.administrator]), bodyValidator, callbackErrorHandler(generalController.createRole));

router
  .route('/:id')
  .get(restrictRoles([roles.administrator]), paramValidator, callbackErrorHandler(generalController.getRole))
  .put(restrictRoles([roles.administrator]), paramValidator, bodyValidator, callbackErrorHandler(generalController.updateRole))
  .delete(restrictRoles([roles.administrator]), paramValidator, callbackErrorHandler(generalController.deleteRole));

module.exports = router;
