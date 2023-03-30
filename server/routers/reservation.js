const { callbackErrorHandler } = require('../middleware/error-handler');
const express = require('express');

const reservationController = require('../controllers/reservation');

const router = express.Router();

router
  .route('/')
  .post(callbackErrorHandler(reservationController.createReservation))
  .get(callbackErrorHandler(reservationController.getAllReservations));

router
  .route('/:id')
  .get(callbackErrorHandler(reservationController.getReservation))
  .put(callbackErrorHandler(reservationController.updateReservation))
  .delete(callbackErrorHandler(reservationController.deleteReservation));

module.exports = router;
