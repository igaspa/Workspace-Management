// const responseMessage = require('../utils/response-messages');
// const { errors } = require('../utils/errors');
const { workingSpace, workingSpaceType } = require('../database/models');
const { v4: uuidv4 } = require('uuid');

exports.createWorkingSpaces = async (req) => {
  const { start, end, areaId, typeId, permanentlyReserved } = req.body;

  let count = start;

  const type = await workingSpaceType.findOne({
    where: {
      id: typeId
    },
    attributes: ['name']
  });
  console.log(type);

  // after we count working spaces we know from where to continue
  const objectList = [];
  while (count <= end) {
    objectList.push({
      id: uuidv4(),
      name: `${type.name} - ${count}`,
      permanentlyReserved,
      typeId,
      areaId
    });
    count++;
  }

  // bulk insert all working spaces in db
  await workingSpace.bulkCreate(objectList);
};
