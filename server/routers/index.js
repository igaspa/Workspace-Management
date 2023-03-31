const workingSpaceRouter = require('./working-space');
const workingSpaceTypeRouter = require('./working-space-type');
const notificationTemplateRouter = require('./notification-template');
const notificationRouter = require('./notification');
const areaRouter = require('./area');
const locationRouter = require('./location');
const reservationRouter = require('./reservation');
const userRouter = require('./user');
const roleRouter = require('./role');
const userRoleRouter = require('./user-role');

const express = require('express');
const router = express.Router();

router.use('/working-space', workingSpaceRouter);
router.use('/working-space-type', workingSpaceTypeRouter);
router.use('/notification-template', notificationTemplateRouter);
router.use('/notification', notificationRouter);
router.use('/area', areaRouter);
router.use('/location', locationRouter);
router.use('/reservation', reservationRouter);
router.use('/user', userRouter);
router.use('/user-role', userRoleRouter);
router.use('/role', roleRouter);

module.exports = router;
