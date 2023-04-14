const workspaceService = require('../services/workspace');
const responseMessage = require('../utils/response-messages');
const { workspace, workspaceType, reservation, sequelize } = require('../database/models');
const { Op } = require('sequelize');
const generalController = require('./general');
const { errors } = require('../utils/errors');
const { EXCLUDE_LIST } = require('../utils/constants');

const workspaceCustomIncludeOptions = (queryParams) => {
  const options = [];
  const { workspace_type, status, from, until } = queryParams;

  if (workspace_type) {
    const workspaceTypeName = workspace_type.replace(/_/g, ' ');
    const term = {
      model: workspaceType,
      where: { name: { [Op.iLike]: workspaceTypeName } },
      attributes: []
    };
    options.push(term);
  }

  if (status && status === 'busy') {
    const term = {
      attributes: { exclude: EXCLUDE_LIST },
      model: reservation
    };
    if (from || until) {
      // Return all workspaces that all reserved from-until date range
      const startTime = from ? new Date(from) : new Date();
      const endTime = until ? new Date(until) : new Date(new Date(startTime).setHours(24, 0, 0, 0));
      term.where = {
        [Op.or]: [
          {
            [Op.and]: [
              { start_at: { [Op.lt]: endTime } },
              { end_at: { [Op.gt]: startTime } }
            ]
          },
          { end_at: null }
        ]
      };
    } else {
      // Return all workspaces that have any kind of active reservations
      term.where = {
        [Op.or]: [
          { end_at: { [Op.gt]: new Date() } },
          { end_at: null }
        ]
      };
    }
    options.push(term);
  }

  return options;
};

const workspaceCustomWhereOptions = (queryParams) => {
  const options = [];
  const { from, until, status } = queryParams;

  if (status && status === 'available') {
    const startTime = from ? new Date(from) : new Date();
    const endTime = until ? new Date(until) : new Date(new Date(startTime).setHours(24, 0, 0, 0));
    // Return all workspaces whose reservation is not overlapping with the requested date range
    const term = {
      [Op.not]: [
        sequelize.literal(`EXISTS (
          SELECT *
          FROM reservation
          WHERE
            reservation.workspace_id = workspace.id AND
            reservation.start_at < ${sequelize.escape(endTime)} AND
            reservation.end_at > ${sequelize.escape(startTime)}
        )`)
      ],
      permanently_reserved: false
    };
    options.push(term);
  }
  return options;
};

exports.createWorkspaces = async (req, res) => {
  await workspaceService.createMultipleWorkspaces(req);
  return res.status(201).json({
    message: responseMessage.CREATE_SUCCESS(workspace.name)
  });
};

exports.createOneWorkspace = async (req, res) => {
  await generalController.createModel(workspace, req, res);
};

module.exports.getAllWorkspaces = async (req, res) => {
  const customIncludeOptions = workspaceCustomIncludeOptions(req.query);
  const customWhereOptions = workspaceCustomWhereOptions(req.query);

  const customOptions = {
    include: customIncludeOptions,
    where: customWhereOptions
  };

  await generalController.findAllModels(workspace, customOptions, req, res);
};

module.exports.getWorkspace = async (req, res) => {
  await generalController.findOneModel(workspace, null, req, res);
};

module.exports.updateWorkspace = async (req, res) => {
  await generalController.updateModel(workspace, req, res);
};

module.exports.deleteWorkspace = async (req, res) => {
  await workspaceService.deleteMultipleWorkspaces(req);

  return res.status(200).json({
    message: responseMessage.DELETE_SUCCESS(workspace.name + 's')
  });
};

module.exports.deleteWorkspacesFromArea = async (req, res) => {
  await workspaceService.deleteWorkspacesFromArea(req);

  return res.status(200).json({
    message: responseMessage.DELETE_SUCCESS(workspace.name + 's')
  });
};

module.exports.deleteWorkspacesFromLocation = async (req, res) => {
  await workspaceService.deleteWorkspacesFromLocation(req);

  return res.status(200).json({
    message: responseMessage.DELETE_SUCCESS(workspace.name + 's')
  });
};

module.exports.deleteMultipleWorkspaces = async (req, res) => {
  await workspaceService.deleteMultipleWorkspaces(req);

  return res.status(200).json({
    message: responseMessage.DELETE_SUCCESS(workspace.name + 's')
  });
};
