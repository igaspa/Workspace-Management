const { reservation, workspace, workspaceType, sequelize } = require('../database/models');
const { Op } = require('sequelize');
const { errors } = require('../utils/errors');
const responseMessage = require('../utils/response-messages');
const { validateReservationConstraints, validateMinimumReservationInterval } = require('./helpers/reservation-calculations');
const { roles } = require('../utils/roles');
const { CONFERENCE_ROOM_ID } = require('../utils/constants');

exports.validateUserRights = async (req) => {
  const { id } = req.params;
  const userReservation = await reservation.findOne({
    where: { id },
    attributes: ['userId', 'endAt']
  });
  if (
    (req.user.id !== userReservation.id && !req.user.roles.includes(roles.administrator)) ||
    userReservation.endAt === null
  ) {
    throw errors.FORBIDDEN(responseMessage.USER_PERMISSION_ERROR);
  }
};

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

const savePernamentReservationToDB = async (data) => {
  const { id, userId, workspaceId, start } = data;
  let transaction;

  try {
    // Start  transaction
    transaction = await sequelize.transaction();

    // Create the reservation
    await reservation.create({ id, userId, workspaceId, startAt: start }, { transaction });

    // Update the workspace with the permanentlyReserved flag
    await workspace.update(
      { permanentlyReserved: true },
      { where: { id: workspaceId }, transaction }
    );
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw errors.INTERNAL_ERROR(responseMessage.CREATE_UNSUCCESSFULL_INTERNAL);
  }
};

exports.createPernamentReservation = async (req) => {
  const { id, userId, workspaceId, startAt } = req.body;

  // retrieve all current reservations for this worksapceId
  const workspaceReservations = await reservation.count({
    where: {
      workspaceId,
      [Op.or]: [
        { endAt: { [Op.gt]: new Date(startAt) } },
        { endAt: null }
      ]
    }
  });

  // throw error if this workspace has active reservations
  if (workspaceReservations) throw errors.CONFLICT(responseMessage.WORKSPACE_PERNAMENT_RESERVATION_CONFLICT);

  // count users permanent reservations
  const userReservations = await reservation.count({
    where: { userId, endAt: null }
  });

  // throw error if this user has permanent reservation
  if (userReservations) throw errors.CONFLICT(responseMessage.USER_PERNAMENT_RESERVATION_CONFLICT);

  // Create date objects corresponding to the dates that were sent
  const start = new Date(startAt);
  const data = { id, userId, workspaceId, start };
  await savePernamentReservationToDB(data);
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

  const { permanentlyReserved, workspaceType: { id: workspaceTypeId, maxReservationTimeDaily, maxReservationTimeOverall } } = workspaceInfo;

  // validate this workspace is not permanently reserved
  if (permanentlyReserved) throw errors.CONFLICT(responseMessage.WORKSPACE_PERMANENTLY_RESERVED);

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
  const participants = workspaceTypeId === CONFERENCE_ROOM_ID ? req.body.participants : null;
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
  if (currentReservation.startAt <= new Date()) throw errors.VALIDATION(responseMessage.UPDATE_STARTED_RESERVATION);
  if (currentReservation.endAt <= new Date()) throw errors.VALIDATION(responseMessage.UPDATE_EXPIRED_RESERVATION);

  // destruct needed attributes for validation
  const { workspace: { workspaceType: { id: workspaceTypeId, maxReservationTimeDaily, maxReservationTimeOverall } } } = currentReservation;

  // create Date object with new start and end
  const start = new Date(startAt);
  const end = new Date(endAt);

  const userRoles = req.user.roles;

  // validate reservation time if user is not administrator or lead
  if (!userRoles.includes(roles.administrator || roles.lead)) {
    const reservations = getUserReservationsByWorkspaceType(userId, workspaceTypeId);
    // filter all reservations except requested one, since we need to validate new reservation start and end
    const reservationsExceptRequested = reservations.filter(reservation => reservation.id !== id);
    const data = { start, end, maxReservationTimeDaily, maxReservationTimeOverall };
    validateReservationConstraints(reservationsExceptRequested, data);
  }

  // all reservations need to be divisible with min interval
  validateMinimumReservationInterval(start, end);

  // updateReservation
  const participants = workspaceTypeId === CONFERENCE_ROOM_ID ? req.body.participants : null;
  const [updatedModel, _updatedData] = await reservation.update(
    { startAt: start, endAt: end, participants }, {
      where: {
        id,
        userId
      },
      returning: true
    });
  if (!updatedModel) throw errors.BAD_REQUEST(responseMessage.UPDATE_UNSUCCESSFULL(reservation.name));
};
