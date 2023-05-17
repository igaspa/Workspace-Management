const { workspace, area, sequelize } = require('../database/models');
const { errors } = require('../utils/errors');
const responseMessage = require('../utils/response-messages');
const { deleteWorkspaces } = require('./helpers/delete-workspace');

exports.deleteArea = async (req, res) => {
  const { id } = req.params;
  const transaction = await sequelize.transaction();

  const workspaceList = await workspace.findAll({ where: { areaId: id } });
  const workspaceIdList = workspaceList.map(workspace => workspace.id);
  try {
    if (workspaceIdList.length) {
      await deleteWorkspaces(workspaceIdList, req.body.forceDelete, transaction);
    }
    const deletedArea = await area.destroy({ where: { id } }, { transaction });

    if (!deletedArea) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(area.name));

    await transaction.commit();
    res.status(200).json({
      message: responseMessage.DELETE_SUCCESS(area.name)
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
