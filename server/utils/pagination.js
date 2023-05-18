const { paginationValues } = require('../utils/constants');
module.exports.findPages = async (Model, options, limit) => {
  const allItems = await Model.count(options);
  const pageCount = Math.ceil(allItems / limit);

  return pageCount;
};

module.exports.getPagination = (page, size) => {
  const limit = size ? Number(size) : paginationValues.DEFAULT_LIMIT;
  const offset = page ? (Number(page) - 1) * limit : paginationValues.DEFAULT_OFFSET;

  return { limit, offset };
};
