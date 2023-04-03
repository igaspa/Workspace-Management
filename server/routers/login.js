const express = require('express');
const { login } = require('../controllers/login');
const { callbackErrorHandler } = require('../middleware/error-handler');
const router = express.Router();

router
  .route('/')
  .post(callbackErrorHandler(login));

module.exports = router;
