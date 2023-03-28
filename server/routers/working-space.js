const { callbackErrorHandler } = require('../middleware/error-handler');
const express = require('express');
// const { workingSpace } = require('../database/models');

const workingSpaceController = require('../controllers/working-space');

const router = express.Router();

router.post('/working-space', callbackErrorHandler(workingSpaceController.createWorkingSpace));

module.exports = router;
