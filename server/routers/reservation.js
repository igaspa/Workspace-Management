const { callbackErrorHandler } = require('../middleware/error-handler');
const express = require('express');

const { bodyValidator } = require('../middleware/joi-validator');
const reservationController = require('../controllers/reservation');
const { roles } = require('../utils/roles');
const { authenticateUser, restrictRoles } = require('../middleware/authenticate-user');

const router = express.Router();

router.use(callbackErrorHandler(authenticateUser));

router
  .route('/')
  .post(
    restrictRoles([roles.administrator, roles.lead, roles.employee]),
    bodyValidator,
    callbackErrorHandler(reservationController.createReservation)
  )
  .get(callbackErrorHandler(reservationController.getAllReservations));

router
  .route('/:id')
  .get(callbackErrorHandler(reservationController.getReservation))
  .put(callbackErrorHandler(reservationController.updateReservation))
  .delete(callbackErrorHandler(reservationController.deleteReservation));

module.exports = router;
