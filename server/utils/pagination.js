const { paginationValues } = require('../utils/constants');
module.exports.findPages = async (Model, options) => {
  const allItems = await Model.count(options);
  const pageCount = Math.ceil(allItems / paginationValues.DEFAULT_LIMIT);

  return pageCount;
};

module.exports.getPagination = (page, size) => {
  const limit = size ? Number(size) : paginationValues.DEFAULT_LIMIT;
  const offset = page ? page * limit : paginationValues.DEFAULT_OFFSET;

  return { limit, offset };
};
