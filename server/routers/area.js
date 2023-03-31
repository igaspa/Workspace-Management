const express = require('express');

const generalController = require('../controllers/area');
const { bodyValidator, paramValidator } = require('../middleware/joi-validator');
const { callbackErrorHandler } = require('../middleware/error-handler');

const router = express.Router();

router
  .route('/')
  .get(callbackErrorHandler(generalController.getAllAreas))
  .post(bodyValidator, callbackErrorHandler(generalController.createArea));

router
  .route('/:id')
  .get(paramValidator, callbackErrorHandler(generalController.getArea))
  .put(paramValidator, bodyValidator, callbackErrorHandler(generalController.updateArea))
  .delete(paramValidator, callbackErrorHandler(generalController.deleteArea));

module.exports = router;
