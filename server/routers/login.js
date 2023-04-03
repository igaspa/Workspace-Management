const express = require('express');
const { login } = require('../controllers/login');
const { callbackErrorHandler } = require('../middleware/error-handler');
const { bodyValidator } = require('../middleware/joi-validator');
const router = express.Router();

router
  .route('/')
  .post(bodyValidator, callbackErrorHandler(login));

module.exports = router;
