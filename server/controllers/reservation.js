const { Op } = require('sequelize');
const { reservation } = require('../database/models');
const generalController = require('./general');
const reservationService = require('../services/reservation');
const responseMessage = require('../utils/response-messages');

const reservationCustomOptions = (queryParams) => {
  const options = [];
  const { from, until } = queryParams;

  if (from || until) {
    const startTime = new Date(from).setHours(0, 0, 0, 0);
    const endTime = until ? new Date(until) : new Date(new Date(from).setHours(24, 0, 0, 0));
    // Retrieve all reservations from - until
    const term = {
      [Op.or]: [
        { end_at: null },
        {
          [Op.and]: [
            { start_at: { [Op.lt]: endTime } },
            { end_at: { [Op.gt]: startTime } }
          ]
        }
      ]
    };
    options.push(term);
  }

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

module.exports.getAllReservations = async (req, res) => {
  const reservationWhereOptions = reservationCustomOptions(req.query);
  const query = {
    where: reservationWhereOptions
  };
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
