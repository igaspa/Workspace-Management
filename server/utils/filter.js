const { Sequelize } = require('../database/models');

exports.searchByTerm = (queryParams) => {
  if (queryParams) {
    const term = { [Sequelize.Op.iLike]: '%' + queryParams + '%' };
    return term;
  }
  return '';
};
