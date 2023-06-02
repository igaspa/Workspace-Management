const express = require('express');
const router = express.Router();

const generalController = require('../controllers/area');
const { roles } = require('../utils/roles');
const { bodyValidator, paramValidator } = require('../middleware/joi-validator');
const { callbackErrorHandler } = require('../middleware/error-handler');
const { restrictRoles, authenticateUser } = require('../middleware/authenticate-user');

router.use(callbackErrorHandler(authenticateUser));

router
  .route('/')
  .get(
    restrictRoles([roles.administrator, roles.lead, roles.employee]),
    callbackErrorHandler(generalController.getAllAreas)
  )
  .post(restrictRoles([roles.administrator]), bodyValidator, callbackErrorHandler(generalController.createArea));

router
  .route('/:id')
  .get(
    restrictRoles([roles.administrator, roles.lead, roles.employee]),
    paramValidator,
    callbackErrorHandler(generalController.getArea)
  )
  .put(
    restrictRoles([roles.administrator]),
    paramValidator,
    bodyValidator,
    callbackErrorHandler(generalController.updateArea)
  )
  .delete(restrictRoles([roles.administrator]), paramValidator, callbackErrorHandler(generalController.deleteArea));

module.exports = router;
