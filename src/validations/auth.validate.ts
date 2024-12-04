import Joi from 'joi';

export const authValidation = {
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    isSuperAdmin: Joi.boolean().optional().default(false),
  }),
};
