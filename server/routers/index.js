const workingSpaceRouter = require('./working-space');
const notificationTemplateRouter = require('./notification-template');
const notificationRouter = require('./notification');
const areaRouter = require('./area');
const locationRouter = require('./location');

const express = require('express');
const router = express.Router();

router.use('/working-space', workingSpaceRouter);
router.use('/notification-template', notificationTemplateRouter);
router.use('/notification', notificationRouter);
router.use('/area', areaRouter);
router.use('/location', locationRouter);

module.exports = router;
