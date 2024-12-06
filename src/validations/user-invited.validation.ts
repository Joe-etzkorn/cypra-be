import Joi from 'joi';

export const userInviteValidation = {
  inviteUser: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
  }),

  verifyToken: Joi.object({
    token: Joi.string().required(),
  }),
}; 