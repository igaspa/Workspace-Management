const joi = require('joi');

const reservationIntervalSchema = joi.string().custom((value, helpers) => {
  const intervalRegex = /^(\d+\s+days?\s*)?(\d{2}:\d{2}(:\d{2})?)?$/;
  if (!intervalRegex.test(value)) {
    const key = helpers.state.path[0];
    return helpers.message(`Invalid interval format for ${key}. Valid example: "08:00".`);
  }
  return value;
});

const reservationWindowSchema = joi.string().custom((value, helpers) => {
  const intervalRegex = /^(\d+\s+days?)?$/;
  const key = helpers.state.path[0];
  if (!intervalRegex.test(value)) {
    return helpers.message(`Invalid interval format for ${key}. Valid example: "7 days".`);
  }
  const numOfDays = parseInt(value.split(' ')[0]);
  if (numOfDays < 1 || numOfDays > 365) {
    return helpers.message(`Allowed number of days for ${key} is 1-365. Valid example: "7 days".`);
  }
  return value;
});

exports.idSchema = joi.string().guid({ version: 'uuidv4' });
// Work Space Type Entity Schema
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
  maxReservationInterval: reservationIntervalSchema.alter({
    post: (reservationIntervalSchema) => reservationIntervalSchema.required(),
    put: (reservationIntervalSchema) => reservationIntervalSchema.optional()
  }),
  maxReservationWindow: reservationWindowSchema.alter({
    post: (reservationWindowSchema) => reservationWindowSchema.required(),
    put: (reservationWindowSchema) => reservationWindowSchema.optional()
  }),
  allowPermanentReservations: joi.boolean().alter({
    post: (workspaceTypeSchema) => workspaceTypeSchema.required(),
    put: (workspaceTypeSchema) => workspaceTypeSchema.optional()
  })
}).options({ abortEarly: false });

// Work Space Entity Schema
exports.workspace_collection = joi.object({
  permanentlyReserved: joi.boolean()
    .optional(),
  typeId: joi.string()
    .guid({ version: 'uuidv4' })
    .required(),
  areaId: joi.string()
    .guid({ version: 'uuidv4' })
    .required(),
  participantLimit: joi.number()
    .min(1)
    .max(100)
    .alter({
      post: (workspaceTypeSchema) => workspaceTypeSchema.optional(),
      put: (workspaceTypeSchema) => workspaceTypeSchema.optional()
    }),
  prefix: joi.string()
    .min(2)
    .max(30)
    .required(),
  start: joi.number()
    .min(1)
    .required(),
  end: joi.number()
    .max(200)
    .required(),
  addedAccessories: joi.array().items(joi.object().keys({
    id: joi.string().guid(),
    quantity: joi.number()
  }))
}).options({ abortEarly: false });

exports.workspace = joi.object({
  id: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (workspaceTypeSchema) => workspaceTypeSchema.required(),
      put: (workspaceTypeSchema) => workspaceTypeSchema.forbidden()
    }),
  typeId: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (workspaceTypeSchema) => workspaceTypeSchema.required(),
      put: (workspaceTypeSchema) => workspaceTypeSchema.optional()
    }),
  areaId: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (workspaceTypeSchema) => workspaceTypeSchema.required(),
      put: (workspaceTypeSchema) => workspaceTypeSchema.optional()
    }),
  name: joi.string()
    .min(2)
    .max(30)
    .alter({
      post: (workspaceTypeSchema) => workspaceTypeSchema.required(),
      put: (workspaceTypeSchema) => workspaceTypeSchema.optional()
    }),
  participantLimit: joi.number()
    .min(1)
    .max(100)
    .alter({
      post: (workspaceTypeSchema) => workspaceTypeSchema.optional(),
      put: (workspaceTypeSchema) => workspaceTypeSchema.optional()
    }),
  permanentlyReserved: joi.boolean()
    .optional(),
  addedAccessories: joi.array().items(joi.object().keys({
    id: joi.string().guid(),
    quantity: joi.number()
  }))
    .alter({
      post: (workspaceTypeSchema) => workspaceTypeSchema.optional(),
      put: (workspaceTypeSchema) => workspaceTypeSchema.optional()
    }),
  removedAccessories: joi.array().items(joi.object().keys({
    id: joi.string().guid(),
    quantity: joi.number()
  }))
    .alter({
      post: (workspaceTypeSchema) => workspaceTypeSchema.optional(),
      put: (workspaceTypeSchema) => workspaceTypeSchema.optional()
    }),
  updatedAccessories: joi.array().items(joi.object().keys({
    id: joi.string().guid(),
    quantity: joi.number()
  }))
    .alter({
      post: (workspaceTypeSchema) => workspaceTypeSchema.optional(),
      put: (workspaceTypeSchema) => workspaceTypeSchema.optional()
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
      put: (areaSchema) => areaSchema.optional()
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
  workspaceId: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (reservationSchema) => reservationSchema.required(),
      put: (reservationSchema) => reservationSchema.forbidden()
    }),
  startAt: joi.date()
    .greater(new Date())
    .required(),
  endAt: joi.date()
    .greater(joi.ref('startAt'))
    .required(),
  participants: joi.array()
    .items({
      firstName: joi.string()
        .min(1)
        .max(50)
        .required(),
      lastName: joi.string()
        .min(1)
        .max(50)
        .required(),
      email: joi.string()
        .email({ minDomainSegments: 2 })
        .required()
    })
    .optional()

}).options({ abortEarly: false });

// Reservation Entity Schema
exports.reservation_permanent = joi.object({
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
  startAt: joi.date()
    .greater(new Date())
    .required()

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
    .email()
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
    .email()
    .alter({
      post: (loginSchema) => loginSchema.required(),
      put: (loginSchema) => loginSchema.forbidden()
    }),
  password: joi.string()
    .min(8)
    .max(80)
    .alter({
      post: (loginSchema) => loginSchema.required(),
      put: (loginSchema) => loginSchema.optional()
    })
}).options({ abortEarly: false });

// Workspace-Equipment Entity Schema
exports.workspace_equipment = joi.object({
  workspaceId: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (workspaceEquipmentSchema) => workspaceEquipmentSchema.required(),
      put: (workspaceEquipmentSchema) => workspaceEquipmentSchema.forbidden()
    }),
  equipmentId: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (workspaceEquipmentSchema) => workspaceEquipmentSchema.required(),
      put: (workspaceEquipmentSchema) => workspaceEquipmentSchema.forbidden()
    })
}).options({ abortEarly: false });

// Equipment Entity Schema
exports.equipment = joi.object({
  id: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (equipmentSchema) => equipmentSchema.required(),
      put: (equipmentSchema) => equipmentSchema.forbidden()
    }),
  name: joi.string()
    .min(4)
    .max(50)
    .alter({
      post: (equipmentSchema) => equipmentSchema.required(),
      put: (equipmentSchema) => equipmentSchema.optional()
    })
}).options({ abortEarly: false });
