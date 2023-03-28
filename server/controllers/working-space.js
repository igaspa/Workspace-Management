const workingSpaceService = require('../services/working-space');
const { responseMessage } = require('../utils/response-messages');

exports.createWorkingSpace = async (req, res) => {
  await workingSpaceService.createWorkingSpaces(req.body);
  return res.status(201).json({
    message: responseMessage.createSuccess
  });
};
