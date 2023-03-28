const workingSpaceRouter = require('./working-space');
const notificationTemplateRouter = require('./notification-template');
const notificationRouter = require('./notification');

const express = require('express');
const router = express.Router();

router.use('/working-space', workingSpaceRouter);
router.use('/notification-template', notificationTemplateRouter);
router.use('/notification', notificationRouter);

module.exports = router;
