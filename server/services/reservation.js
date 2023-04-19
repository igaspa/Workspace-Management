const { reservation, workspace, workspaceType, sequelize } = require('../database/models');
const { Op } = require('sequelize');
const { errors } = require('../utils/errors');
const responseMessage = require('../utils/response-messages');
const { validateReservationConstraints, validateMinimumReservationInterval } = require('./helpers/reservation-calculations');
const { roles } = require('../utils/roles');
const { CONFERENCE_ROOM_ID } = require('../utils/constants');

const deletePermamentReservationFromDB = async (data) => {
  const { id, workspaceId } = data;

  // Start  transaction
  const transaction = await sequelize.transaction();
  try {
    // Add endAt date for reservation
    await reservation.update({ endAt: new Date() }, {
      where: { id },
      transaction
    });

    // Update the workspace without the permanentlyReserved flag
    await workspace.update({ permanentlyReserved: false }, {
      where: { id: workspaceId },
      transaction
    });

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

exports.deletePermanentReservation = async (req) => {
  const { id } = req.params;
  const userReservation = await reservation.findOne({
    where: { id },
    attributes: ['workspaceId', 'endAt']
  });
  if (userReservation.endAt) throw errors.NOT_FOUND(responseMessage.NOT_FOUND('Permanent ' + reservation.name));
  const { workspaceId } = userReservation;
  const data = { id, workspaceId };
  await deletePermamentReservationFromDB(data);
};

exports.deleteReservation = async (req) => {
  const { id } = req.params;
  const userReservation = await reservation.findOne({
    where: { id },
    attributes: ['startAt', 'endAt']
  });
  if (!userReservation) throw responseMessage.NOT_FOUND(reservation.name);

  if (new Date(userReservation.startAt) > new Date()) {
    await reservation.destroy({
      where: { id }
    });
  } else if (new Date(userReservation.endAt) < new Date()) {
    throw errors.BAD_REQUEST(responseMessage.DELETE_EXPIRED_RESERVATION_ERROR);
  } else {
    await reservation.update(
      { endAt: new Date() },
      { where: { id } }
    );
  }
};

exports.validateUserRights = async (req) => {
  const { id } = req.params;
  const userReservation = await reservation.findOne({
    where: { id },
    attributes: ['userId', 'endAt']
  });

  if (!userReservation) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(reservation.name));

  if (
    (req.user.id !== userReservation.userId && !req.user.roles.includes(roles.administrator)) ||
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
        attributes: ['id', 'maxReservationInterval', 'maxReservationWindow']
      }]
    }]
  });
  return currentReservation;
};

const savePermanentReservationToDB = async (data) => {
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
    throw error;
  }
};

exports.createPermanentReservation = async (req) => {
  const { id, userId, workspaceId, startAt } = req.body;

  // retrieve workspaceInfo we want to create reservation for
  const workspaceInfo = await workspace.findOne({
    where: { id: workspaceId },
    attributes: [],
    include: [{ model: workspaceType, attributes: ['id'] }]
  });
  if (!workspaceInfo) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(workspace.name));

  const { workspaceType: { id: workspaceTypeId } } = workspaceInfo;

  // retrieve all current reservations from this worksapceId or user
  const countActiveUserOrWorkspaceReservations = await reservation.count({
    where: {
      [Op.or]: [
        {
          workspaceId,
          [Op.or]: [
            { endAt: { [Op.gt]: new Date(startAt) } },
            { endAt: null }
          ]
        },
        {
          userId,
          [Op.or]: [
            { endAt: { [Op.gt]: new Date(startAt) } },
            { endAt: null }
          ]
        }
      ]
    },
    include: [
      {
        model: workspace,
        include: [
          {
            model: workspaceType,
            where: {
              id: workspaceTypeId
            }
          }
        ]
      }
    ]
  });

  // throw error if this user or workspace already has active reservations
  if (countActiveUserOrWorkspaceReservations) throw errors.CONFLICT(responseMessage.ACTIVE_RESERVATION_CONFLICT);

  // Create date objects corresponding to the dates that were sent
  const start = new Date(startAt);
  const data = { id, userId, workspaceId, start };
  await savePermanentReservationToDB(data);
};

exports.createReservation = async (req) => {
  const { id, workspaceId, startAt, endAt } = req.body;

  // retrive workspace with workspaceType from db to get information abot reservation interval
  const workspaceInfo = await workspace.findOne({
    where: { id: workspaceId },
    attributes: ['permanentlyReserved'],
    include: [{ model: workspaceType, attributes: ['id', 'maxReservationInterval', 'maxReservationWindow'] }]
  });
  if (!workspaceInfo) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(workspace.name));

  const { permanentlyReserved, workspaceType: { id: workspaceTypeId, maxReservationInterval, maxReservationWindow } } = workspaceInfo;

  // validate this workspace is not permanently reserved
  if (permanentlyReserved) throw errors.CONFLICT(responseMessage.WORKSPACE_PERMANENTLY_RESERVED);

  const userId = req.user.id;
  const data = { startAt, endAt, maxReservationInterval, maxReservationWindow };
  const userRoles = req.user.roles;

  // validate reservation time if user is not administrator or lead
  if (!userRoles.includes(roles.administrator || roles.lead)) {
    const reservations = await getUserReservationsByWorkspaceType(userId, workspaceTypeId) || [];
    validateReservationConstraints(reservations, data);
  }
  validateMinimumReservationInterval(startAt, endAt);

  // Create the reservation
  const participants = workspaceTypeId === CONFERENCE_ROOM_ID ? req.body.participants : null;
  await reservation.create({
    id,
    userId,
    workspaceId,
    startAt: new Date(startAt),
    endAt: new Date(endAt),
    participants: participants || null
  });
};

exports.updateReservation = async (req) => {
  const { startAt, endAt } = req.body;
  const { id } = req.params;

  // retrieve reservation with workspace and workspaceType information
  const userId = req.user.id;
  const currentReservation = await retrieveReservationsThatIsBeingUpdated(id, userId);

  if (!currentReservation) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(reservation.name));

  // throw error if someone tries to update expired reservation
  if (currentReservation.startAt <= new Date()) throw errors.VALIDATION(responseMessage.UPDATE_STARTED_RESERVATION);
  if (currentReservation.endAt <= new Date()) throw errors.VALIDATION(responseMessage.UPDATE_EXPIRED_RESERVATION);

  // destruct needed attributes for validation
  const { workspace: { workspaceType: { id: workspaceTypeId, maxReservationInterval, maxReservationWindow } } } = currentReservation;

  // validate reservation time if user is not administrator or lead
  const userRoles = req.user.roles;
  if (!userRoles.includes(roles.administrator || roles.lead)) {
    const reservations = getUserReservationsByWorkspaceType(userId, workspaceTypeId);

    // filter all reservations except requested one, since we need to validate new reservation start and end
    const reservationsExceptRequested = reservations.length ? reservations.filter(reservation => reservation.id !== id) : [];
    const data = { startAt, endAt, maxReservationInterval, maxReservationWindow };
    validateReservationConstraints(reservationsExceptRequested, data);
  }

  // all reservations need to be divisible with min interval
  validateMinimumReservationInterval(startAt, endAt);

  // updateReservation
  const participants = workspaceTypeId === CONFERENCE_ROOM_ID ? req.body.participants : null;
  const [updatedModel, _updatedData] = await reservation.update(
    { startAt: new Date(startAt), endAt: new Date(endAt), participants }, {
      where: {
        id,
        userId
      },
      returning: true
    });
  if (!updatedModel) throw errors.BAD_REQUEST(responseMessage.UPDATE_UNSUCCESSFULL(reservation.name));
};
