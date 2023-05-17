const { workspace, workspaceEquipment, area, sequelize } = require('../database/models');
const { v4: uuidv4 } = require('uuid');
const { deleteWorkspaces } = require('./helpers/delete-workspace');
const { errors } = require('../utils/errors');
const responseMessages = require('../utils/response-messages');

exports.createMultipleWorkspaces = async (req) => {
  const { prefix, start, end, areaId, typeId, permanentlyReserved } = req.body;

  let count = start;

  // after we count working spaces we know from where to continue
  const objectList = [];
  while (count <= end) {
    objectList.push({
      id: uuidv4(),
      name: `${prefix} - ${count}`,
      permanentlyReserved: permanentlyReserved || false,
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

const addEquipmentWorkspace = async (itemList, transaction, workspaceId) => {
  for (const el of itemList) {
    console.log(el.quantity, new Date());
    const newModel = await workspaceEquipment.create(
      { workspaceId, equipmentId: el.id, quantity: el.quantity },
      { transaction }
    );
    console.log(newModel);
    if (!newModel) throw errors.BAD_REQUEST(responseMessages.INVALID_ID_TYPE);
  }
};

const removeEquipmentWorkspace = async (itemList, transaction, workspaceId) => {
  for (const el of itemList) {
    const deletedModel = await workspaceEquipment.destroy(
      { where: { workspaceId, equipmentId: el.id } },
      { transaction }
    );
    if (!deletedModel) throw errors.NOT_FOUND(responseMessages.NOT_FOUND(workspaceEquipment.name));
  }
};

const updateEquipmentWorkspace = async (itemList, transaction, workspaceId) => {
  for (const el of itemList) {
    const [updatedModel, _updatedData] = await workspaceEquipment.update(
      { quantity: el.quantity },
      {
        where: { workspaceId, equipmentId: el.id },
        returning: true
      },
      { transaction }
    );

    if (!updatedModel) throw errors.NOT_FOUND(responseMessages.NOT_FOUND(workspaceEquipment.name));
  }
};

exports.updateWorkspace = async (req) => {
  const { addedAccessories, removedAccessories, updatedAccessories } = req.body;
  const { id } = req.params;

  let transaction;
  try {
    transaction = await sequelize.transaction();

    // if there are any new added items add them to db
    if (addedAccessories?.length) await addEquipmentWorkspace(addedAccessories, transaction, id);

    // if there are any items that need to be removed from workspaceEquipment delete them from db
    if (removedAccessories?.length) await removeEquipmentWorkspace(removedAccessories, transaction, id);

    // if there are any updates on existing workspaceEquipment items update them in db
    if (updatedAccessories?.length) await updateEquipmentWorkspace(updatedAccessories, transaction, id);

    // delete body elements that do not belong to workspace object
    delete req.body.addedAccessories;
    delete req.body.removedAccessories;
    delete req.body.updatedAccessories;

    // update workspace with the rest of body data
    if (Object.keys(req.body).length) {
      const [updatedModel, _updatedData] = await workspace.update(req.body, {
        where: { id },
        returning: true
      }, { transaction });
      if (!updatedModel) throw errors.NOT_FOUND(responseMessages.NOT_FOUND(workspace.name));
    }
    await transaction.commit();
  } catch (error) {
    // if there was an error, rollback the transaction
    await transaction.rollback();
    throw error;
  }
};
