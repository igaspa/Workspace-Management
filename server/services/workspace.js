// const responseMessage = require('../utils/response-messages');
// const { errors } = require('../utils/errors');
const { workspace, area, sequelize } = require('../database/models');
const { v4: uuidv4 } = require('uuid');

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

  try {
    await workspace.destroy({ where: { areaId: id }, transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
  }
};

exports.deleteWorkspacesFromLocation = async (req) => {
  const { id } = req.params;

  const areaIds = await area.findAll({
    where: { locationId: id },
    attributes: ['id']
  });
  const transaction = await sequelize.transaction();
  try {
    const workSpacesDeleted = await workspace.destroy({
      where: { areaId: areaIds.map(area => area.id) },
      transaction
    });
    await transaction.commit();
    return workSpacesDeleted;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
