const express = require('express');

const generalController = require('../controllers/area');
const { callbackErrorHandler } = require('../middleware/error-handler');

const router = express.Router();

router
  .route('/')
  .get(callbackErrorHandler(generalController.getAllAreas))
  .post(callbackErrorHandler(generalController.createArea));

router
  .route('/:id')
  .get(callbackErrorHandler(generalController.getArea))
  .put(callbackErrorHandler(generalController.updateArea))
  .delete(callbackErrorHandler(generalController.deleteArea));

module.exports = router;
