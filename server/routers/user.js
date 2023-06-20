const express = require('express');
const router = express.Router();

const generalController = require('../controllers/user');
const { roles } = require('../utils/roles');
const { paramValidator, bodyValidator, bodyValidatorAdditionalAttribute } = require('../middleware/joi-validator');
const { authenticateUser, restrictRoles } = require('../middleware/authenticate-user');
const { callbackErrorHandler } = require('../middleware/error-handler');

router
  .route('/password-create')
  .put(bodyValidatorAdditionalAttribute, callbackErrorHandler(generalController.createPassword));

router.route('/reinvite').put(bodyValidatorAdditionalAttribute, callbackErrorHandler(generalController.reinviteUser));

router
  .route('/password-reset')
  .put(bodyValidatorAdditionalAttribute, callbackErrorHandler(generalController.passwordReset));

router.use(callbackErrorHandler(authenticateUser));
router
  .route('/')
  .get(
    restrictRoles([roles.administrator, roles.employee, roles.lead]),
    callbackErrorHandler(generalController.getAllUsers)
  )
  .post(restrictRoles([roles.administrator]), bodyValidator, callbackErrorHandler(generalController.createUser));

router
  .route('/:id')
  .get(
    restrictRoles([roles.administrator, roles.employee, roles.lead]),
    paramValidator,
    callbackErrorHandler(generalController.getUser)
  )
  .put(
    restrictRoles([roles.administrator]),
    paramValidator,
    bodyValidator,
    callbackErrorHandler(generalController.updateUser)
  )
  .delete(restrictRoles([roles.administrator]), paramValidator, callbackErrorHandler(generalController.deleteUser));

module.exports = router;
