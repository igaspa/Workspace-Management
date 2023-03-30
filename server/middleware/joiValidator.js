const joiSchemaList = require('../validators/joiSchemaList');
const { errors } = require('../utils/errors');

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
      if (error) throw errors.VALIDATION(error.details);
    }
  }

  next();
};
// Validate sent request body
exports.bodyValidator = (req, _res, next) => {
  let schema = null;
  const schemaName = req.baseUrl.split('/')[3];
  schemaName.replace('-', '_');

  // Accepted body properties depend on whether it is a PUT or POST Request
  schema = joiSchemaList[schemaName].tailor(req.method.toLowerCase());
  const { error } = schema.validate(req.body, VALIDATION_OPTION);
  if (error) throw errors.VALIDATION(error.details[0].message);
  next();
};
