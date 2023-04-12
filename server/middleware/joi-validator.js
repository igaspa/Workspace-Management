const joiSchemaList = require('../validators/joi-schema-list');
const { errors } = require('../utils/errors');
const responseMessages = require('../utils/response-messages');

// Remove / from error messages
const VALIDATION_OPTION = {
  errors: {
    wrap: {
      label: ''
    }
  }
};
// Validate sent parameters
exports.paramValidator = (req, _res, next) => {
  if (req.params) {
    for (const param in req.params) {
      const { error } = joiSchemaList.idSchema.validate(req.params[param], VALIDATION_OPTION);
      if (error) throw errors.VALIDATION(error.details.map(err => err.message));
    }
  }

  next();
};
// Validate sent request body
exports.bodyValidator = (req, _res, next) => {
  if (!Object.keys(req.body).length) throw errors.VALIDATION(responseMessages.NO_BODY);

  const schemaName = req.originalUrl.split('/')[3];
  const newSchemaName = schemaName.replace(/-/g, '_');

  // Accepted body properties depend on whether it is a PUT or POST Request
  const schema = joiSchemaList[newSchemaName].tailor(req.method.toLowerCase());
  const { error } = schema.validate(req.body, VALIDATION_OPTION);
  if (error) throw errors.VALIDATION(error.details.map(err => err.message));
  next();
};

// Validate sent request body
exports.bodyValidatorAdditionalAttribute = (req, _res, next) => {
  if (!Object.keys(req.body).length) throw errors.VALIDATION(responseMessages.NO_BODY);

  const schemaNameList = req.originalUrl.split('/');
  const schemaName = schemaNameList[3] + '_' + schemaNameList[4];
  const newSchemaName = schemaName.replace(/-/g, '_');

  // Accepted body properties depend on whether it is a PUT or POST Request
  const schema = joiSchemaList[newSchemaName].tailor(req.method.toLowerCase());
  const { error } = schema.validate(req.body, VALIDATION_OPTION);
  if (error) throw errors.VALIDATION(error.details.map(err => err.message));
  next();
};
