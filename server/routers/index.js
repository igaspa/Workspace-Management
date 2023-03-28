const express = require('express');
const router = express.Router();

const workingSpace = require('./working-space');
router.use('/', workingSpace);

module.exports = router;
