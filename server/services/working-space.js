// const responseMessage = require('../utils/response-messages');
// const { errors } = require('../utils/errors');
const { workingSpace } = require('../database/models');

exports.createWorkingSpaces = async (workSpaceType, req) => {
  const { start, end, area_id, type_id, permanently_reserved } = req.body;
  let num = start;

  const objectList = [];
  while (num <= end) {
    objectList.push({
      name: `${workSpaceType.name}-${start}`,
      permanently_reserved,
      type_id,
      area_id
    });
    num++;
  }
  //   return objectList;
  await workingSpace.bulkCreate(objectList);
};
