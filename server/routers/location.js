const express = require('express');
const router = express.Router();

const generalController = require('../controllers/location');
const { roles } = require('../utils/roles');
const { bodyValidator, paramValidator } = require('../middleware/joi-validator');
const { callbackErrorHandler } = require('../middleware/error-handler');
const { authenticateUser, restrictRoles } = require('../middleware/authenticate-user');

router.use(callbackErrorHandler(authenticateUser));

router
  .route('/')
  .get(restrictRoles([roles.administrator]), callbackErrorHandler(generalController.getAllLocations))
  .post(restrictRoles([roles.administrator]), bodyValidator, callbackErrorHandler(generalController.createLocation));

router
  .route('/:id')
  .get(restrictRoles([roles.administrator]), paramValidator, callbackErrorHandler(generalController.getLocation))
  .put(restrictRoles([roles.administrator]), paramValidator, bodyValidator, callbackErrorHandler(generalController.updateLocation))
  .delete(restrictRoles([roles.administrator]), paramValidator, callbackErrorHandler(generalController.deleteLocation));

module.exports = router;
