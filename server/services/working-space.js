// const responseMessage = require('../utils/response-messages');
// const { errors } = require('../utils/errors');
const { workingSpace } = require('../database/models');
const { v4: uuidv4 } = require('uuid');

exports.createWorkingSpaces = async (workSpaceType, req) => {
  const { start, end, areaId, typeId, permanentlyReserved } = req.body;
  let num = start;

  const objectList = [];
  while (num <= end) {
    objectList.push({
      id: uuidv4(),
      name: `${workSpaceType.name}-${num}`,
      permanentlyReserved,
      typeId,
      areaId
    });
    num++;
  }
  //   return objectList;
  await workingSpace.bulkCreate(objectList);
};
