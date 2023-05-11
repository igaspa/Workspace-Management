const { reservation, workspace } = require('../../database/models');
const { errors } = require('../../utils/errors');
const responseMessage = require('../../utils/response-messages');
const { Op } = require('sequelize');

const deleteWorkspaces = async (workspaceIdList, forceDelete, transaction) => {
  const existingReservations = await checkCurrentReservations(workspaceIdList);
  let deletedWorkspaces;

  if (forceDelete) {
    await reservation.destroy({ where: { workspaceId: workspaceIdList } }, { transaction });
    deletedWorkspaces = await workspace.destroy({ where: { id: workspaceIdList } }, { transaction });
    return deletedWorkspaces;
  } else if (!existingReservations) {
    deletedWorkspaces = await workspace.destroy({ where: { id: workspaceIdList } }, { transaction });
    return deletedWorkspaces;
  } else {
    throw errors.VALIDATION(responseMessage.RESERVATION_EXISTS);
  }
};

const checkCurrentReservations = async (idList) => {
  const reservations = await reservation.findAll({
    where: {
      [Op.or]: [
        {
          workspaceId: { [Op.or]: idList },
          endAt: { [Op.gt]: new Date() }
        },
        {
          workspaceId: { [Op.or]: idList },
          endAt: null
        }
      ]
    }
  });

  return reservations.length;
};

module.exports = { deleteWorkspaces, checkCurrentReservations };
