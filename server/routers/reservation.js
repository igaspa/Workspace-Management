const { callbackErrorHandler } = require('../middleware/error-handler');
const express = require('express');

const { bodyValidator, bodyValidatorAdditionalAttribute, paramValidator } = require('../middleware/joi-validator');
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
  .get(
    restrictRoles([roles.administrator, roles.lead, roles.employee]),
    callbackErrorHandler(reservationController.getUserActiveReservations)
  );

router
  .route('/history')
  .get(
    restrictRoles([roles.administrator, roles.lead, roles.employee]),
    callbackErrorHandler(reservationController.getUserReservationHistory)
  );

router
  .route('/all')
  .get(
    restrictRoles([roles.administrator, roles.lead, roles.employee]),
    callbackErrorHandler(reservationController.getAllActiveReservations)
  );

router
  .route('/all/history')
  .get(
    restrictRoles([roles.administrator, roles.lead]),
    callbackErrorHandler(reservationController.getAllReservations)
  );

router
  .route('/:id')
  .get(
    restrictRoles([roles.administrator, roles.lead, roles.employee]), paramValidator,
    callbackErrorHandler(reservationController.getReservation)
  )
  .put(
    restrictRoles([roles.administrator, roles.lead, roles.employee]), paramValidator,
    bodyValidator,
    callbackErrorHandler(reservationController.updateReservation)
  )
  .delete(
    restrictRoles([roles.administrator, roles.lead, roles.employee]), paramValidator,
    callbackErrorHandler(reservationController.deleteReservation)
  );

router
  .route('/permanent')
  .post(
    restrictRoles([roles.administrator, roles.lead]),
    bodyValidatorAdditionalAttribute,
    callbackErrorHandler(reservationController.createPermanentReservation)
  );

router
  .route('/permanent/:id')
  .delete(
    restrictRoles([roles.administrator, roles.lead]), paramValidator,
    callbackErrorHandler(reservationController.deletePermanentReservation)
  );

module.exports = router;
