import Joi from 'joi';

export const userValidation = {
  createUser: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).*$/)
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters',
        'string.pattern.base':
          'Password must contain at least one uppercase letter, one special character, and one number',
        'any.required': 'Password is required',
      }),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    companyName: Joi.string().allow('').required(),
    clientId: Joi.string().optional(),
    clientSecret: Joi.string().optional(),
  }),

  updateUser: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().allow(null, '').optional(),
  }),

  getCompanyUsers: Joi.object({
    userId: Joi.number().required().messages({
      'number.base': 'User ID must be a number',
      'any.required': 'User ID is required'
    })
  }),

  toggleAdminPrivilege: Joi.object({
    userId: Joi.number().required(),
    adminId: Joi.number().required(),
    isAdministrator: Joi.number().valid(0, 1).required()
  })
};
