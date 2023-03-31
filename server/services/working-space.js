// const responseMessage = require('../utils/response-messages');
// const { errors } = require('../utils/errors');
const { workingSpace } = require('../database/models');
const { v4: uuidv4 } = require('uuid');

exports.createMultipleWorkingSpaces = async (req) => {
  const { prefix, start, end, areaId, typeId, permanentlyReserved } = req.body;

  let count = start;

  // after we count working spaces we know from where to continue
  const objectList = [];
  while (count <= end) {
    objectList.push({
      id: uuidv4(),
      name: `${prefix} - ${count}`,
      permanentlyReserved,
      typeId,
      areaId
    });
    count++;
  }

  // bulk insert all working spaces in db
  await workingSpace.bulkCreate(objectList);
};
