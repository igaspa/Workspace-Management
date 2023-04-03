const joi = require('joi');

exports.idSchema = joi.string().guid({ version: 'uuidv4' });
// Working Space Type Entity Schema
exports.workspace_type = joi.object({
  id: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (workspaceTypeSchema) => workspaceTypeSchema.required(),
      put: (workspaceTypeSchema) => workspaceTypeSchema.forbidden()
    }),
  name: joi.string()
    .min(3)
    .max(50)
    .alter({
      post: (workspaceTypeSchema) => workspaceTypeSchema.required(),
      put: (workspaceTypeSchema) => workspaceTypeSchema.optional()
    }),
  reservationTime: joi.string()
    .required()
}).options({ abortEarly: false });

// Working Space Entity Schema
exports.workspace_collection = joi.object({
  permanentlyReserved: joi.boolean()
    .required(),
  typeId: joi.string()
    .guid({ version: 'uuidv4' })
    .required(),
  areaId: joi.string()
    .guid({ version: 'uuidv4' })
    .required(),
  prefix: joi.string()
    .min(2)
    .max(20)
    .required(),
  start: joi.number()
    .min(1)
    .required(),
  end: joi.number()
    .max(200)
    .required()
}).options({ abortEarly: false });

exports.workspace = joi.object({
  id: joi.string()
    .guid({ version: 'uuidv4' })
    .required(),
  typeId: joi.string()
    .guid({ version: 'uuidv4' })
    .required(),
  areaId: joi.string()
    .guid({ version: 'uuidv4' })
    .required(),
  name: joi.string()
    .min(2)
    .max(20)
    .required(),
  permanentlyReserved: joi.boolean()
    .required()
}).options({ abortEarly: false });

// Area Entity Schema
exports.area = joi.object({
  id: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (areaSchema) => areaSchema.required(),
      put: (areaSchema) => areaSchema.forbidden()
    }),
  name: joi.string()
    .min(3)
    .max(50)
    .alter({
      post: (areaSchema) => areaSchema.required(),
      put: (areaSchema) => areaSchema.optional()
    }),
  floor: joi.string()
    .min(1)
    .max(50)
    .alter({
      post: (areaSchema) => areaSchema.required(),
      put: (areaSchema) => areaSchema.optional()
    }),
  locationId: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (areaSchema) => areaSchema.required(),
      put: (areaSchema) => areaSchema.forbidden()
    }),
  image: joi.string()
    .min(10)
    .max(150)
    .alter({
      post: (areaSchema) => areaSchema.required(),
      put: (areaSchema) => areaSchema.optional()
    })
}).options({ abortEarly: false });

// Location Entity Schema
exports.location = joi.object({
  id: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (locationSchema) => locationSchema.required(),
      put: (locationSchema) => locationSchema.forbidden()
    }),
  address: joi.string()
    .min(5)
    .max(50)
    .alter({
      post: (locationSchema) => locationSchema.required(),
      put: (locationSchema) => locationSchema.optional()
    }),
  city: joi.string()
    .min(3)
    .max(50)
    .alter({
      post: (locationSchema) => locationSchema.required(),
      put: (locationSchema) => locationSchema.optional()
    }),
  country: joi.string()
    .min(3)
    .max(50)
    .alter({
      post: (locationSchema) => locationSchema.required(),
      put: (locationSchema) => locationSchema.optional()
    })
}).options({ abortEarly: false });

// Reservation Entity Schema
exports.reservation = joi.object({
  id: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (reservationSchema) => reservationSchema.required(),
      put: (reservationSchema) => reservationSchema.forbidden()
    }),
  userId: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (reservationSchema) => reservationSchema.required(),
      put: (reservationSchema) => reservationSchema.forbidden()
    }),
  workspaceId: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (reservationSchema) => reservationSchema.required(),
      put: (reservationSchema) => reservationSchema.forbidden()
    }),
  participants: joi.array()
    .items({
      firstName: joi.string()
        .min(5)
        .max(50)
        .alter({
          post: (workspaceId) => workspaceId.required(),
          put: (workspaceId) => workspaceId.optional()
        }),
      lastName: joi.string()
        .min(5)
        .max(50)
        .alter({
          post: (workspaceId) => workspaceId.required(),
          put: (workspaceId) => workspaceId.optional()
        }),
      email: joi.string()
        .email({ minDomainSegments: 2 })
        .alter({
          post: (workspaceId) => workspaceId.required(),
          put: (workspaceId) => workspaceId.forbidden()
        })
    })
}).options({ abortEarly: false });

// Role Entity Schema
exports.role = joi.object({
  id: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (roleSchema) => roleSchema.required(),
      put: (roleSchema) => roleSchema.forbidden()
    }),
  name: joi.string()
    .min(4)
    .required()
}).options({ abortEarly: false });

// User Entity Schema
exports.user = joi.object({
  id: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (userSchema) => userSchema.required(),
      put: (userSchema) => userSchema.forbidden()
    }),
  firstName: joi.string()
    .min(3)
    .max(50)
    .alter({
      post: (userSchema) => userSchema.required(),
      put: (userSchema) => userSchema.optional()
    }),
  lastName: joi.string()
    .min(3)
    .max(50)
    .alter({
      post: (userSchema) => userSchema.required(),
      put: (userSchema) => userSchema.optional()
    }),
  email: joi.string()
    .alter({
      post: (userSchema) => userSchema.required(),
      put: (userSchema) => userSchema.forbidden()
    }),
  password: joi.string()
    .min(8)
    .max(80)
    .alter({
      post: (userSchema) => userSchema.required(),
      put: (userSchema) => userSchema.optional()
    }),
  phoneNumber: joi.string()
    .min(10)
    .max(15)
    .alter({
      post: (userSchema) => userSchema.required(),
      put: (userSchema) => userSchema.optional()
    })
}).options({ abortEarly: false });

// User-Role Entity Schema
exports.user_role = joi.object({
  roleId: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (userRoleSchema) => userRoleSchema.required(),
      put: (userRoleSchema) => userRoleSchema.forbidden()
    }),
  userId: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (userRoleSchema) => userRoleSchema.required(),
      put: (userRoleSchema) => userRoleSchema.forbidden()
    })
}).options({ abortEarly: false });

// Login schema
exports.login = joi.object({
  email: joi.string()
    .alter({
      post: (userSchema) => userSchema.required(),
      put: (userSchema) => userSchema.forbidden()
    }),
  password: joi.string()
    .min(8)
    .max(80)
    .alter({
      post: (userSchema) => userSchema.required(),
      put: (userSchema) => userSchema.optional()
    })
}).options({ abortEarly: false });
