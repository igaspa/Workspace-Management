const responseMessage = require('../utils/response-messages');
const { errors } = require('../utils/errors');
const { reservation, workspace, workspaceType, sequelize } = require('../database/models');
const { v4: uuidv4 } = require('uuid');

const validateReservationStartDate = (reservationStart, intervalInMs) => {
  if (new Date(reservationStart).getTime() + intervalInMs <= new Date().getTime()) {
    throw errors.VALIDATION(responseMessage.MINIMUM_RESERVATION_START_ERROR);
  }

  console.log(new Date(reservationStart).getTime() - intervalInMs, new Date().getTime());
};

exports.createReservation = async (req, res) => {
  const { userId, workspaceId, reservationStart, reservationEnd } = req.body;

  // retrive workspace with workspaceType from db to get information abot reservation interval
  const workspaceInfo = await workspace.findOne({
    where: { id: workspaceId },
    include: [{ model: workspaceType }]
  });
  if (!workspaceInfo) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(workspace.name));

  const { reservationTime } = workspaceInfo.workspaceType;
  const { hours, minutes } = reservationTime;
  const intervalInMs = ((hours || 0) * 60 * 60 + (minutes || 0) * 60) * 1000;

  const numIntervals = ((new Date(reservationEnd) - new Date(reservationStart)) / intervalInMs);
  if (!Number.isInteger(numIntervals) || numIntervals < 1) throw errors.VALIDATION(responseMessage.MINIMUM_RESERVATION_TIME_ERROR);

  validateReservationStartDate(reservationStart, intervalInMs);

  // Create the reservations
  const transaction = await sequelize.transaction();
  const reservations = [];
  for (let i = 0; i < numIntervals; i++) {
    const reservationStartPlusInterval = new Date(new Date(reservationStart).getTime() + i * intervalInMs);
    const reservationEndPlusInterval = new Date(new Date(reservationStartPlusInterval).getTime() + intervalInMs);
    reservations.push({
      id: uuidv4(),
      userId,
      workspaceId,
      reservationStart: reservationStartPlusInterval,
      reservationEnd: reservationEndPlusInterval
    });
  }
  try {
    await reservation.bulkCreate(reservations, { transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }

  return res.status(201).json({ message: responseMessage.CREATE_SUCCESS(reservation.name) });
};
