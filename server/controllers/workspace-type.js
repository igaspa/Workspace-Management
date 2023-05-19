const { workspaceType } = require('../database/models');
const generalController = require('./general');
const { searchByTerm } = require('../utils/filter');

module.exports.getAllWorkspaceTypes = async (req, res) => {
  const { name } = req.query;
  if (name?.length < 3) {
    res.status(200).json([]);
  } else if (!name) {
    await generalController.findAllModels(workspaceType, null, req, res);
  } else {
    const searchedTerm = searchByTerm(name);
    const query = {
      where: [{ name: searchedTerm }]
    };
    await generalController.findAllModels(workspaceType, query, req, res);
  }
};

module.exports.getWorkspaceType = async (req, res) => {
  await generalController.findOneModel(workspaceType, null, req, res);
};

module.exports.createWorkspaceType = async (req, res) => {
  await generalController.createModel(workspaceType, req, res);
};

module.exports.updateWorkspaceType = async (req, res) => {
  await generalController.updateModel(workspaceType, req, res);
};

module.exports.deleteWorkspaceType = async (req, res) => {
  await generalController.deleteModel(workspaceType, req, res);
};
