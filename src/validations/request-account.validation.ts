import Joi from 'joi';

export const requestAccountValidation = {
  createRequestAccount: Joi.object({
    name: Joi.string().required(),
    companyName: Joi.string().required(),
    email: Joi.string().email().required(),
    hasUsedAspire: Joi.boolean().required(),
    phone: Joi.string().optional(),
    comments: Joi.string().optional(),
  }),

  getRequestedAccount: Joi.object({
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).optional(),
    hasUsedAspire: Joi.boolean().optional(),
    requestedDateFrom: Joi.date().iso().optional(),
    requestedDateTo: Joi.date()
      .iso()
      .min(Joi.ref('requestedDateFrom'))
      .optional(),
    searchValue: Joi.string().allow('').optional(),
  }),

  generateToken: Joi.object({
    requestedAccountId: Joi.number().required(),
  }),

  verifyToken: Joi.object({
    token: Joi.string().required(),
  }),
};
