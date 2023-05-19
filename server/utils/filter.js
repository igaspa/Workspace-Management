const { Sequelize } = require('../database/models');

exports.searchByUserName = (queryParams) => {
  const { firstName, lastName } = queryParams;
  const option = [];
  if (firstName) {
    const term = { first_name: { [Sequelize.Op.iLike]: '%' + queryParams.firstName + '%' } };
    option.push(term);
  }
  if (lastName) {
    const term = { last_name: { [Sequelize.Op.iLike]: '%' + queryParams.lastName + '%' } };
    option.push(term);
  }

  return option;
};

exports.searchByTerm = (queryParams) => {
  if (queryParams) {
    const term = { [Sequelize.Op.iLike]: '%' + queryParams + '%' };
    return term;
  }
  return '';
};
