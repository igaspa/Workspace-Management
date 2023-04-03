const express = require('express');
const router = express.Router();

const generalController = require('../controllers/user-role');
const { roles } = require('../utils/roles');
const { paramValidator, bodyValidator } = require('../middleware/joi-validator');
const { restrictRoles, authenticateUser } = require('../middleware/authenticate-user');
const { callbackErrorHandler } = require('../middleware/error-handler');

router.use(callbackErrorHandler(authenticateUser));

router
  .route('/')
  .get(restrictRoles([roles.administrator]), callbackErrorHandler(generalController.getAllUserRoles))
  .post(restrictRoles([roles.administrator]), bodyValidator, callbackErrorHandler(generalController.createUserRole));

router
  .route('/:firstId/:secondId')
  .get(restrictRoles([roles.administrator]), paramValidator, callbackErrorHandler(generalController.getUserRoles))
  .delete(restrictRoles([roles.administrator]), paramValidator, callbackErrorHandler(generalController.deleteUserRole));

module.exports = router;
