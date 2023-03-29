// const responseMessage = require('../utils/response-messages');
// const { errors } = require('../utils/errors');
const { workingSpace } = require('../database/models');
const { v4: uuidv4 } = require('uuid');

exports.createWorkingSpaces = async (req) => {
  const { total, areaId, type, permanentlyReserved } = req.body;

  let start = await workingSpace.count() + 1 || 0;
  const end = start + total;
  console.log(start, end);

  const objectList = [];
  while (start <= end) {
    objectList.push({
      id: uuidv4(),
      name: `${type.name} - ${start}`,
      permanentlyReserved,
      typeId: type.id,
      areaId
    });
    start++;
  }
  //   return objectList;
  await workingSpace.bulkCreate(objectList);
};
