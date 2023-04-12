const { callbackErrorHandler } = require('../middleware/error-handler');
const express = require('express');

const { bodyValidator, bodyValidatorAdditionalAttribute } = require('../middleware/joi-validator');
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
    callbackErrorHandler(reservationController.getAllReservations)
  );

router
  .route('/:id')
  .get(
    restrictRoles([roles.administrator, roles.lead, roles.employee]),
    callbackErrorHandler(reservationController.getReservation)
  )
  .put(
    restrictRoles([roles.administrator, roles.lead, roles.employee]),
    bodyValidator,
    callbackErrorHandler(reservationController.updateReservation)
  )
  .delete(
    restrictRoles([roles.administrator, roles.lead, roles.employee]),
    callbackErrorHandler(reservationController.deleteReservation)
  );

router
  .route('/pernament')
  .post(
    restrictRoles([roles.administrator, roles.lead]),
    bodyValidatorAdditionalAttribute,
    callbackErrorHandler(reservationController.createPernamentReservation)
  );

router
  .route('/pernament/:id')
  .delete(
    restrictRoles([roles.administrator, roles.lead]),
    bodyValidatorAdditionalAttribute,
    callbackErrorHandler(reservationController.deletePermanentReservation)
  );

module.exports = router;
