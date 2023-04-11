const responseMessage = require('../utils/response-messages');
const { reservation } = require('../database/models');
const reservationService = require('../services/reservation');
const generalController = require('./general');

exports.createReservation = async (req, res) => {
  await reservationService.createReservation(req);
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
  return res.status(200).json({
    message: responseMessage.UPDATE_SUCCESS(reservation.name)
  });
};

module.exports.deleteReservation = async (req, res) => {
  await generalController.deleteModel(reservation, req, res);
};
