const express = require('express');
const router = express.Router();

const backOfficeRoutes = require('./working-space');
router.use('/back-office', backOfficeRoutes);

module.exports = router;
