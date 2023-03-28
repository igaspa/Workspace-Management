const EXCLUDE_LIST = require('../utils/constants');
const { findPages, getPagination } = require('../utils/pagination');
const errors = require('../utils/errors');
const responseMessage = require('../utils/error-messages');

module.exports.findAllModels = async (Model, customOptions, req, res) => {
  const { page, size } = req.query;
  // Take page number from parameters
  if (page) {
    if (isNaN(page) || page < 1) {
      // TODO THROW ERROR
    }
  }
  const { limit, offset } = getPagination(page, size);
  const options = {
    attributes: { exclude: EXCLUDE_LIST },
    where: [{ deletedAt: null }],
    order: [],
    limit,
    offset,
    include: []
  };
  // Add new options if they exist
  if (customOptions) {
    for (const property in customOptions) {
      options[property] = options[property].concat(customOptions[property]);
    }
  }

  // Find number of pages
  const pageCount = await findPages(Model, options);

  // Set number of pages into header
  res.set('Access-Control-Expose-Headers', 'X-Total-Pages');
  res.set('X-Total-Pages', pageCount);

  const models = await Model.findAll(options);
  if (!models) { throw errors.NOT_FOUND(responseMessage.NOT_FOUND(Model.name)); };

  res.status(200).json(models);
};

module.exports.findOneModel = async (Model, customOptions, req, res) => {
  const options = {
    attributes: { exclude: EXCLUDE_LIST },
    where: [{ id: req.params.id, deletedAt: null }],
    order: [],
    include: []
  };
    // Add new options if they exist
  if (customOptions) {
    for (const property in customOptions) {
      options[property] = options[property].concat(customOptions[property]);
    }
  }

  const model = await Model.findOne(options);
  if (!model) { throw errors.NOT_FOUND(responseMessage.NOT_FOUND(Model.name)); };

  res.status(200).json(model);
};

module.exports.createModel = async (Model, req, res) => {
  const itemData = req.body;
  const newItem = await Model.create(itemData);

  res.status(201).json(newItem);
};

module.exports.updateModel = async (Model, req, res) => {
  const updatedModel = await Model.update(req.body, {
    where: { id: req.params.id, deleted: false },
    returning: true
  });
  if (updatedModel[0] === 0) { throw errors.NOT_FOUND(responseMessage.NOT_FOUND(Model.name)); };

  res.status(200).json(updatedModel);
};

module.exports.deleteModel = async (Model, req, res) => {
  const deletedModel = await Model.destroy({
    where: { id: req.params.id, deleted: false }
  });
  if (deletedModel[0] === 0) { throw errors.NOT_FOUND(responseMessage.NOT_FOUND(Model.name)); };

  res.status(200).json(deletedModel);
};
