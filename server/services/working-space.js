// const responseMessage = require('../utils/response-messages');
// const { errors } = require('../utils/errors');
const { workingSpace, area } = require('../database/models');
const { v4: uuidv4 } = require('uuid');

exports.createWorkingSpaces = async (req) => {
  const { total, areaInfo, type, permanentlyReserved } = req.body;

  // count all working spaces based on their type and location
  let count = await workingSpace.count({
    where: {
      type_id: type.id
    },
    include: [
      {
        model: area,
        where: {
          locationId: areaInfo.locationId
        }
      }
    ]
  }) + 1 || 1;

  const end = count + total;

  // after we count working spaces we know from where to continue
  const objectList = [];
  while (count <= end) {
    objectList.push({
      id: uuidv4(),
      name: `${type.name} - ${count}`,
      permanentlyReserved,
      typeId: type.id,
      areaId: areaInfo.id
    });
    count++;
  }

  // bulk insert all working spaces in db
  await workingSpace.bulkCreate(objectList);
};
