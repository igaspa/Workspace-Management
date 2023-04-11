const responseMessage = require('../utils/response-messages');
const { errors } = require('../utils/errors');
const { reservation, workspace, workspaceType } = require('../database/models');
const { CONFERENCE_ROOM_ID } = require('../utils/constants');
const { Op } = require('sequelize');
const { roles } = require('../utils/roles');
const { validateReservationConstraints, validateMinimumReservationInterval } = require('./helpers/reservation-calculations');

const getUserReservationsByWorkspaceType = async (userId, workspaceTypeId) => {
  const reservations = await reservation.findAll({
    where: {
      userId,
      [Op.or]: [
        { endAt: { [Op.gt]: new Date() } },
        { endAt: null }
      ]
    },
    attributes: ['startAt', 'endAt'],
    include: [{
      model: workspace,
      where: { typeId: workspaceTypeId },
      attributes: ['permanentlyReserved']
    }],
    order: [['startAt', 'ASC']]
  });

  return reservations;
};

const retrieveReservationsThatIsBeingUpdated = async (reservationId, userId) => {
  const currentReservation = await reservation.findOne({
    where: { id: reservationId, userId },
    include: [{
      model: workspace,
      include: [{
        model: workspaceType,
        attributes: ['id', 'maxReservationTimeDaily', 'maxReservationTimeOverall']
      }]
    }]
  });
  return currentReservation;
};

exports.createReservation = async (req) => {
  const { id, workspaceId, startAt, endAt } = req.body;

  // retrive workspace with workspaceType from db to get information abot reservation interval
  const workspaceInfo = await workspace.findOne({
    where: { id: workspaceId },
    attributes: ['permanentlyReserved'],
    include: [{ model: workspaceType, attributes: ['id', 'maxReservationTimeDaily', 'maxReservationTimeOverall'] }]
  });
  if (!workspaceInfo) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(workspace.name));

  // validate this workspace is not permanently reserved
  if (workspaceInfo.permanentlyReserved) throw errors.CONFLICT(responseMessage.WORKSPACE_PERMANENTLY_RESERVED);

  const { maxReservationTimeDaily, maxReservationTimeOverall, id: workspaceTypeId } = workspaceInfo.workspaceType;

  const userId = req.user.id;
  const reservations = await getUserReservationsByWorkspaceType(userId, workspaceTypeId);

  // Create date objects corresponding to the dates that were sent
  const start = new Date(startAt);
  const end = new Date(endAt);

  const data = { start, end, maxReservationTimeDaily, maxReservationTimeOverall };
  const userRoles = req.user.roles;

  // validate reservation time if user is not administrator or lead
  if (!userRoles.includes(roles.administrator || roles.lead)) {
    validateReservationConstraints(reservations, data);
  }
  validateMinimumReservationInterval(start, end);

  // Create the reservation
  const participants = workspaceInfo.workspaceType.id === CONFERENCE_ROOM_ID ? req.body.participants : null;
  await reservation.create({
    id,
    userId,
    workspaceId,
    startAt: start,
    endAt: end,
    participants: participants || null
  });
};

exports.updateReservation = async (req) => {
  // TO DO
  const { startAt, endAt } = req.body;
  const { id } = req.params;

  // retrive reservation with workspace and workspaceType information
  const userId = req.user.id;
  const currentReservation = await retrieveReservationsThatIsBeingUpdated(id, userId);

  if (!currentReservation) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(reservation.name));

  // throw error if someone tries to update expired reservation
  if (currentReservation.endAt <= new Date()) throw errors.VALIDATION(responseMessage.UPDATE_EXPIRED_RESERVATION);
  if (currentReservation.startAt <= new Date()) throw errors.VALIDATION(responseMessage.UPDATE_STARTED_RESERVATION);

  // destruct needed attributes for validation
  const {
    workspace: { workspaceType: { id: workspaceTypeId } },
    workspace: { workspaceType: { maxReservationTimeDaily } },
    workspace: { workspaceType: { maxReservationTimeOverall } }
  } = currentReservation;

  // create Date object with new start and end
  const start = new Date(startAt);
  const end = new Date(endAt);

  const userRoles = req.user.roles;

  // validate reservation time if user is not administrator or lead
  if (!userRoles.includes(roles.administrator || roles.lead)) {
    const data = { start, end, maxReservationTimeDaily, maxReservationTimeOverall };
    const reservations = getUserReservationsByWorkspaceType(userId, workspaceTypeId);
    // filter all reservations except requested one, since we need to validate new reservation start and end
    const reservationsExceptRequested = reservations.filter(reservation => reservation.id !== id);
    validateReservationConstraints(reservationsExceptRequested, data);
  }

  // all reservations need to be divisible with min interval
  validateMinimumReservationInterval(start, end);

  // updateReservation
  const [updatedModel, _updatedData] = await reservation.update(
    { startAt: start, endAt: end }, {
      where: {
        id,
        userId
      },
      returning: true
    });
  if (!updatedModel) throw errors.BAD_REQUEST(responseMessage.UPDATE_UNSUCCESSFULL(reservation.name));
};
