import Joi from 'joi';

export const authValidation = {
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    isSuperAdmin: Joi.boolean().optional().default(false),
  }),

  forgotPassword: Joi.object({
    email: Joi.string().email().required(),
  }),

  verifyForgotPasswordToken: Joi.object({
    token: Joi.string().required(),
  }),

  resetPassword: Joi.object({
    token: Joi.string().required(),
    newPassword: Joi.string()
      .min(8)
      .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).*$/)
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters',
        'string.pattern.base':
          'Password must contain at least one uppercase letter, one special character, and one number',
        'any.required': 'Password is required',
      }),
  }),
};
