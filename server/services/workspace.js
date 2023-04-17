const { workspace, area, sequelize } = require('../database/models');
const { v4: uuidv4 } = require('uuid');
const { deleteWorkspaces } = require('./helpers/delete-workspace');
const { errors } = require('../utils/errors');

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

  const workspaceList = await workspace.findAll({
    where: { areaId: id },
    attributes: ['id']
  });
  if (!workspaceList.length) throw errors.NOT_FOUND(workspace.name + 's');

  const workspaceIdList = workspaceList.map(workspace => workspace.id);
  try {
    await deleteWorkspaces(workspaceIdList, req.body.forceDelete, transaction);
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

exports.deleteWorkspacesFromLocation = async (req) => {
  const { id } = req.params;
  const transaction = await sequelize.transaction();

  const areas = await area.findAll({
    where: { locationId: id },
    attributes: ['id']
  });
  const areaListId = areas.map(area => area.id);
  const workspaceList = await workspace.findAll({
    where: { areaId: areaListId }
  });
  if (!workspaceList.length) throw errors.NOT_FOUND(workspace.name + 's');

  const workspaceIdList = workspaceList.map(workspace => workspace.id);
  try {
    await deleteWorkspaces(workspaceIdList, req.body.forceDelete, transaction);
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

exports.deleteMultipleWorkspaces = async (req) => {
  let idList = [];
  req.params.id ? idList.push(req.params.id) : idList = req.body.workspaceList.map(el => el.id);
  const transaction = await sequelize.transaction();

  const deletedWorkspaces = await deleteWorkspaces(idList, req.body.forceDelete, transaction);
  if (!deletedWorkspaces) throw errors.NOT_FOUND(workspace.name);
};
