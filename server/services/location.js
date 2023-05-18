const { workspace, area, sequelize, location } = require('../database/models');
const { errors } = require('../utils/errors');
const responseMessage = require('../utils/response-messages');
const { deleteWorkspaces } = require('./helpers/delete-workspace');

exports.deleteLocation = async (req, res) => {
  const { id } = req.params;
  const transaction = await sequelize.transaction();

  const areaIds = await area.findAll({
    where: { locationId: id },
    attributes: ['id']
  });
  const areaListId = areaIds.map(area => area.id);

  const workspaceList = await workspace.findAll({
    where: { areaId: areaListId },
    attributes: ['id']
  });
  const workspaceIdList = workspaceList.map(workspace => workspace.id);

  try {
    if (workspaceIdList.length) {
      await deleteWorkspaces(workspaceIdList, req.body.forceDelete, transaction);
      await area.destroy({
        where: { id: areaIds.map(area => area.id) }
      }, { transaction });
    }

    const deletedLocation = await location.destroy({ where: { id } }, { transaction });

    if (!deletedLocation) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(location.name));
    await transaction.commit();
    res.status(200).json({
      message: responseMessage.DELETE_SUCCESS(location.name)
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
