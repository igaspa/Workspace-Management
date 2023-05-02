const workspaceRouter = require('./workspace');
const workspaceTypeRouter = require('./workspace-type');
const notificationTemplateRouter = require('./notification-template');
const notificationRouter = require('./notification');
const areaRouter = require('./area');
const locationRouter = require('./location');
const reservationRouter = require('./reservation');
const userRouter = require('./user');
const roleRouter = require('./role');
const userRoleRouter = require('./user-role');
const loginRouter = require('./login');
const workspaceEquipment = require('./workspace-equipment');

const express = require('express');
const router = express.Router();

router.use('/workspace', workspaceRouter);
router.use('/workspace-type', workspaceTypeRouter);
router.use('/notification-template', notificationTemplateRouter);
router.use('/notification', notificationRouter);
router.use('/area', areaRouter);
router.use('/location', locationRouter);
router.use('/reservation', reservationRouter);
router.use('/user', userRouter);
router.use('/user-role', userRoleRouter);
router.use('/role', roleRouter);
router.use('/login', loginRouter);
router.use('/workspace-equipment', workspaceEquipment);

module.exports = router;
