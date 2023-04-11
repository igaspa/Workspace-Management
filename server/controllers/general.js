const { EXCLUDE_LIST } = require('../utils/constants');
const { findPages, getPagination } = require('../utils/pagination');
const { errors } = require('../utils/errors');
const responseMessage = require('../utils/response-messages');
const { checkModelAssociations } = require('./helpers/model-associations');

module.exports.findAllModels = async (Model, customOptions, req, res) => {
  const { page, size, include } = req.query;

  // Take page number from parameters
  if (page) {
    if (isNaN(page) || page < 1) {
      throw errors.VALIDATION(responseMessage.INVALID_PAGE);
    }
  }
  const { limit, offset } = getPagination(page, size);
  const options = {
    attributes: { exclude: EXCLUDE_LIST },
    where: [],
    order: [],
    limit,
    offset,
    include: []
  };

  // Add included models
  if (include) {
    const includeOptions = checkModelAssociations(Model, include);
    options.include = includeOptions;
  }

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
  if (!models) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(Model.name));

  res.status(200).json(models);
};

module.exports.findOneModel = async (Model, customOptions, req, res) => {
  const { id } = req.params;
  const { include } = req.query;

  const options = {
    attributes: { exclude: EXCLUDE_LIST },
    where: [{ id }],
    order: [],
    include: []
  };

  // Add included models
  if (include) {
    const includeOptions = checkModelAssociations(Model, include);
    options.include = includeOptions;
  }

  // Add new options if they exist
  if (customOptions) {
    for (const property in customOptions) {
      options[property] = options[property].concat(customOptions[property]);
    }
  }

  const model = await Model.findOne(options);
  if (!model) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(Model.name));

  res.status(200).json(model);
};

module.exports.createModel = async (Model, req, res) => {
  const itemData = req.body;
  const newItem = await Model.create(itemData);

  res.status(201).json(newItem);
};

module.exports.updateModel = async (Model, req, res) => {
  const [updatedModel, _updatedData] = await Model.update(req.body, {
    where: { id: req.params.id },
    returning: true
  });

  if (!updatedModel) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(Model.name));

  res.status(200).json({ message: responseMessage.UPDATE_SUCCESS(Model.name) });
};

module.exports.deleteModel = async (Model, req, res) => {
  const deletedModel = await Model.destroy({
    where: { id: req.params.id }
  });

  if (!deletedModel) throw errors.NOT_FOUND(responseMessage.NOT_FOUND(Model.name));

  res.status(200).json({ message: responseMessage.DELETE_SUCCESS(Model.name) });
};
