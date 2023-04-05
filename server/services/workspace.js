// const responseMessage = require('../utils/response-messages');
// const { errors } = require('../utils/errors');
const { workspace, area, sequelize, reservation } = require('../database/models');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');
const { errors } = require('../utils/errors');
const responseMessage = require('../utils/response-messages');

exports.createMultipleWorkspaces = async (req) => {
  const { prefix, start, end, areaId, typeId, permanentlyReserved } = req.body;

  let count = start;

  // after we count working spaces we know from where to continue
  const objectList = [];
  while (count <= end) {
    objectList.push({
      id: uuidv4(),
      name: `${prefix} - ${count}`,
      permanentlyReserved,
      typeId,
      areaId
    });
    count++;
  }

  // bulk insert all working spaces in db
  await workspace.bulkCreate(objectList);
};

exports.deleteWorkspacesFromArea = async (req) => {
  const { id } = req.params;
  const transaction = await sequelize.transaction();

  const workspaceList = await workspace.findAll({ where: { areaId: id } });
  const workspaceIdList = workspaceList.map(workspace => workspace.id);
  try {
    deleteWorkspaces(workspaceIdList, req.body.forceDelete);
    transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

exports.deleteAreasFromLocation = async (req) => {
  const { id } = req.params;
  const transaction = await sequelize.transaction();

  const areaIds = await area.findAll({
    where: { locationId: id },
    attributes: ['id']
  });
  const areaListId = areaIds.map(area => area.id);

  const workspaceList = await workspace.findAll({
    where: { areaId: areaListId }
  });
  const workspaceIdList = workspaceList.map(workspace => workspace.id);
  try {
    await deleteWorkspaces(workspaceIdList, req.body.forceDelete);
    await area.destroy({
      where: { id: areaIds.map(area => area.id) }
    });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

exports.deleteWorkspacesFromLocation = async (req) => {
  const { id } = req.params;
  const transaction = await sequelize.transaction();

  const areaIds = await area.findAll({
    where: { locationId: id },
    attributes: ['id']
  });
  const areaListId = areaIds.map(area => area.id);
  const workspaceList = await workspace.findAll({
    where: { areaId: areaListId }
  });
  const workspaceIdList = workspaceList.map(workspace => workspace.id);
  try {
    deleteWorkspaces(workspaceIdList, req.body.forceDelete);
    transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const deleteWorkspaces = async (workspaceIdList, forceDelete) => {
  const existingReservations = await checkCurrentReservations(workspaceIdList);

  if (!existingReservations || forceDelete) {
    await workspace.destroy({ where: { id: workspaceIdList } });
  } else {
    throw errors.VALIDATION(responseMessage.RESERVATION_EXISTS);
  }
};

const checkCurrentReservations = async (idList) => {
  const reservations = await reservation.findAll({
    where: {
      id: { [Op.or]: idList },
      reservationStart: { [Op.gte]: new Date() },
      reservationEnd: { [Op.gte]: new Date() }
    }
  });
  return reservations.length;
};
