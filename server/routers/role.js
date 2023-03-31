const express = require('express');

const generalController = require('../controllers/role');
const { paramValidator, bodyValidator } = require('../middleware/joi-validator');

const { callbackErrorHandler } = require('../middleware/error-handler');

const router = express.Router();

router
  .route('/')
  .get(callbackErrorHandler(generalController.getAllRoles))
  .post(bodyValidator, callbackErrorHandler(generalController.createRole));

router
  .route('/:id')
  .get(paramValidator, callbackErrorHandler(generalController.getRole))
  .put(paramValidator, bodyValidator, callbackErrorHandler(generalController.updateRole))
  .delete(paramValidator, callbackErrorHandler(generalController.deleteRole));

module.exports = router;
