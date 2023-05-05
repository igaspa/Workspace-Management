const { Op } = require('sequelize');
const { reservation } = require('../database/models');
const generalController = require('./general');
const reservationService = require('../services/reservation');
const responseMessage = require('../utils/response-messages');

const activeReservations = () => {
  const options = [];
  const term = {
    [Op.or]: [
      { end_at: null },
      { end_at: { [Op.gt]: new Date() } }
    ]
  };
  options.push(term);
  return options;
};

module.exports.createReservation = async (req, res) => {
  await reservationService.createReservation(req);
  return res.status(201).json({ message: responseMessage.CREATE_SUCCESS(reservation.name) });
};

exports.createPermanentReservation = async (req, res) => {
  await reservationService.createPermanentReservation(req);
  return res.status(201).json({ message: responseMessage.CREATE_SUCCESS(reservation.name) });
};

module.exports.getAllActiveReservations = async (req, res) => {
  const reservationWhereOptions = activeReservations();
  const query = { where: reservationWhereOptions };
  await generalController.findAllModels(reservation, query, req, res);
};

module.exports.getAllReservations = async (req, res) => {
  await generalController.findAllModels(reservation, null, req, res);
};

module.exports.getUserActiveReservations = async (req, res) => {
  const reservationWhereOptions = activeReservations();
  reservationWhereOptions.push({ user_id: req.user.id });
  const query = { where: reservationWhereOptions };
  await generalController.findAllModels(reservation, query, req, res);
};

module.exports.getUserReservationHistory = async (req, res) => {
  const query = { where: [{ user_id: req.user.id }] };
  await generalController.findAllModels(reservation, query, req, res);
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
