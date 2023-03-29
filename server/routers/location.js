const express = require('express');

const generalController = require('../controllers/location');
const { callbackErrorHandler } = require('../middleware/error-handler');

const router = express.Router();

router
  .route('/')
  .get(callbackErrorHandler(generalController.getAllLocations))
  .post(callbackErrorHandler(generalController.createLocation));

router
  .route('/:id')
  .get(callbackErrorHandler(generalController.getLocation))
  .put(callbackErrorHandler(generalController.updateLocation))
  .delete(callbackErrorHandler(generalController.deleteLocation));

module.exports = router;
