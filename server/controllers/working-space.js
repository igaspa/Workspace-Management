const workingSpaceService = require('../services/working-space');
const responseMessage = require('../utils/response-messages');
const models = require('../database/models');

exports.createWorkingSpace = async (req, res) => {
  const { typeId } = req.body;
  const workSpaceType = await models.workingSpaceType.findOne({
    where: { id: typeId }
  });
  await workingSpaceService.createWorkingSpaces(workSpaceType, req);
  return res.status(201).json({
    message: responseMessage.CREATE_SUCCESS
  });
};
