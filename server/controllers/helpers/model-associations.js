const { errors } = require('../../utils/errors');
const models = require('../../database/models');
const responseMessages = require('../../utils/response-messages');
const { EXCLUDE_LIST } = require('../../utils/constants');

module.exports.checkModelAssociations = (Model, include, attribiteList) => {
  const associations = Object.keys(Model.associations);
  const result = [];

  if (typeof include === 'string') {
    include = [include];
  }

  include.forEach(association => {
    if (!associations.includes(association)) {
      throw errors.NOT_FOUND(responseMessages.ASSOCIATION_NOT_FOUND(association, Model.name));
    }
    switch (Model.associations[association].associationType) {
      case 'BelongsTo': {
        result.push({
          model: models[association],
          attributes: { exclude: EXCLUDE_LIST }
        });
        break;
      }
      case 'HasMany': {
        const tableName = Model.associations[association].options.name.singular;
        result.push({
          model: models[tableName],
          attributes: { exclude: EXCLUDE_LIST }
        });
        break;
      }
      case 'BelongsToMany': {
        const joinTable = Model.associations[association].options.through.model.name;
        const tableName = Model.associations[association].options.name.singular;
        result.push({
          through: { model: models[joinTable] },
          model: models[tableName],
          attributes: { exclude: EXCLUDE_LIST }
        });
        break;
      }
      default:
        break;
    }
  });
  return result;
};
