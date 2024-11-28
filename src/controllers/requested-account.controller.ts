import { Request, Response } from 'express';
import { sendResponse } from '../utils/response';
import Joi from 'joi';
import { JwtPayload } from 'jsonwebtoken';
import { Message } from '../enums/message.enum';
import { createRequestAccount } from '../services/requested-account.service';

export const createReqAccount = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const schema = Joi.object({
    name: Joi.string().required(),
    companyName: Joi.string().required(),
    email: Joi.string().email().required(),
    hasUsedAspire: Joi.boolean().required(),
    phone: Joi.string().optional(),
    comments: Joi.string().optional(),
  });

  try {
    const { error } = schema.validate(req.body);
    if (error) {
      sendResponse(
        res,
        400,
        false,
        Message.VALIDATION_ERROR,
        undefined,
        error.details,
      );
      return;
    }

    const requestedAccount = await createRequestAccount(req.body);
    sendResponse(
      res,
      201,
      true,
      Message.CREATE_REQUEST_ACCOUNT_SUCCESS,
      requestedAccount,
    );
  } catch (error: any) {
    if (
      error.message === Message.ACCOUNT_REQUEST_ALREADY_EXISTS ||
      error.name === 'SequelizeUniqueConstraintError'
    ) {
      sendResponse(res, 400, false, error.message);
      return;
    }
    sendResponse(
      res,
      500,
      false,
      Message.CREATE_REQUEST_ACCOUNT_ERROR,
      undefined,
      error,
    );
  }
};
