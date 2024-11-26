import { Request, Response } from 'express';
import { createUser } from '../services/user.service';
import { sendResponse } from '../utils/response';
import Joi from 'joi';
import { JwtPayload } from 'jsonwebtoken';
import { Message } from '../enums/message.enum';

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const create = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).*$/)
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one special character, and one number',
        'any.required': 'Password is required'
      }),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    companyName: Joi.string().required(),
    clientId: Joi.string().optional(),
    clientSecret: Joi.string().optional()
  });

  try {
    const { error } = schema.validate(req.body);
    if (error) {
      sendResponse(res, 400, false, Message.VALIDATION_ERROR, undefined, error.details);
      return;
    }

    const user = await createUser(req.body);
    sendResponse(res, 201, true, Message.CREATE_USER_SUCCESS, user);
  } catch (error: any) {
    if (error.message === Message.PERMISSION_DENIED) {
      sendResponse(res, 403, false, error.message);
      return;
    }
    if (error.message === Message.EMAIL_ALREADY_EXISTS) {
      sendResponse(res, 400, false, error.message);
      return;
    }
    if (error.message === Message.CREDENTIALS_REQUIRED) {
      sendResponse(res, 400, false, error.message);
      return;
    }
    sendResponse(res, 500, false, Message.CREATE_USER_ERROR, undefined, error);
  }
};