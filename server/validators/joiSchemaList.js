const joi = require('joi');

exports.idSchema = joi.string().guid({ version: 'uuidv4' });
// Working Space Type Entity Schema
exports.working_space_type = joi.object({
  id: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (workingSpaceTypeSchema) => workingSpaceTypeSchema.required(),
      put: (workingSpaceTypeSchema) => workingSpaceTypeSchema.forbidden()
    }),
  name: joi.string()
    .min(3)
    .max(50)
    .alter({
      post: (workingSpaceTypeSchema) => workingSpaceTypeSchema.required(),
      put: (workingSpaceTypeSchema) => workingSpaceTypeSchema.optional()
    })
}).options({ abortEarly: false });

// Working Space Entity Schema
exports.working_space = joi.object({
  id: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (workingSpaceSchema) => workingSpaceSchema.required(),
      put: (workingSpaceSchema) => workingSpaceSchema.forbidden()
    }),
  name: joi.string()
    .min(4)
    .max(50)
    .alter({
      post: (workingSpaceSchema) => workingSpaceSchema.required(),
      put: (workingSpaceSchema) => workingSpaceSchema.optional()
    }),
  permanentlyReserved: joi.boolean()
    .alter({
      post: (workingSpaceSchema) => workingSpaceSchema.required(),
      put: (workingSpaceSchema) => workingSpaceSchema.optional()
    }),
  typeId: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (workingSpaceSchema) => workingSpaceSchema.required(),
      put: (workingSpaceSchema) => workingSpaceSchema.forbidden()
    }),
  areaId: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (workingSpaceSchema) => workingSpaceSchema.required(),
      put: (workingSpaceSchema) => workingSpaceSchema.forbidden()
    })
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
    .max(70)
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
  workingSpaceId: joi.string()
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
          post: (workingSpaceId) => workingSpaceId.required(),
          put: (workingSpaceId) => workingSpaceId.optional()
        }),
      lastName: joi.string()
        .min(5)
        .max(50)
        .alter({
          post: (workingSpaceId) => workingSpaceId.required(),
          put: (workingSpaceId) => workingSpaceId.optional()
        }),
      email: joi.string()
        .email({ minDomainSegments: 2 })
        .alter({
          post: (workingSpaceId) => workingSpaceId.required(),
          put: (workingSpaceId) => workingSpaceId.forbidden()
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
