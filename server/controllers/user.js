const { user } = require('../database/models');
const generalController = require('./general');
const { searchByUserName } = require('../utils/filter');

module.exports.getAllUsers = async (req, res) => {
  const { firstName, lastName } = req.query;
  const searchedName = searchByUserName(req.query);
  if (!searchedName.length) {
    await generalController.findAllModels(user, null, req, res);
  } else if ((firstName && firstName.length < 3) || (lastName && lastName.length < 3)) {
    res.status(200).json([]);
  } else {
    const query = {
      where: searchedName
    };
    await generalController.findAllModels(user, query, req, res);
  }
};

module.exports.getUser = async (req, res) => {
  await generalController.findOneModel(user, null, req, res);
};

module.exports.createUser = async (req, res) => {
  await generalController.createModel(user, req, res);
};

module.exports.updateUser = async (req, res) => {
  await generalController.updateModel(user, req, res);
};

module.exports.deleteUser = async (req, res) => {
  await generalController.deleteModel(user, req, res);
};
