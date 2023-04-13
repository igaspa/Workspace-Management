const responseMessage = require('../utils/response-messages');
const { reservation } = require('../database/models');
const reservationService = require('../services/reservation');
const generalController = require('./general');
const { sendReservationCreatedEmail, sendReservationUpdatedEmail } = require('../services/notification');

module.exports.createReservation = async (req, res) => {
  await reservationService.createReservation(req);
  await sendReservationCreatedEmail(req);
  return res.status(201).json({ message: responseMessage.CREATE_SUCCESS(reservation.name) });
};

exports.createPernamentReservation = async (req, res) => {
  await reservationService.createPernamentReservation(req);
  return res.status(201).json({ message: responseMessage.CREATE_SUCCESS(reservation.name) });
};

module.exports.getAllReservations = async (req, res) => {
  await generalController.findAllModels(reservation, null, req, res);
};

module.exports.getReservation = async (req, res) => {
  await generalController.findOneModel(reservation, null, req, res);
};

module.exports.updateReservation = async (req, res) => {
  await reservationService.updateReservation(req, res);
  await sendReservationUpdatedEmail(req);
  return res.status(200).json({
    message: responseMessage.UPDATE_SUCCESS(reservation.name)
  });
};

module.exports.deleteReservation = async (req, res) => {
  await reservationService.validateUserRights(req);
  await reservationService.deleteReservation(req);
  return res.status(200).json({
    message: responseMessage.DELETE_SUCCESS(reservation.name)
  });
};

module.exports.deletePermanentReservation = async (req, res) => {
  await reservationService.deletePermanentReservation(req);
  return res.status(200).json({
    message: responseMessage.DELETE_SUCCESS(reservation.name)
  });
};
