const express = require('express');

const generalController = require('../controllers/location');
const { bodyValidator, paramValidator } = require('../middleware/joiValidator');
const { callbackErrorHandler } = require('../middleware/error-handler');

const router = express.Router();

router
  .route('/')
  .get(callbackErrorHandler(generalController.getAllLocations))
  .post(bodyValidator, callbackErrorHandler(generalController.createLocation));

router
  .route('/:id')
  .get(paramValidator, callbackErrorHandler(generalController.getLocation))
  .put(paramValidator, bodyValidator, callbackErrorHandler(generalController.updateLocation))
  .delete(paramValidator, callbackErrorHandler(generalController.deleteLocation));

module.exports = router;
