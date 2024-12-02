import { Request, Response } from 'express';
import { sendResponse } from '../utils/response';
import Joi from 'joi';
import { JwtPayload } from 'jsonwebtoken';
import { Message } from '../enums/message.enum';
import { createRequestAccount, getRequestedAccountsList, generateRequestAccountToken, verifyRequestAccountToken } from '../services/requested-account.service';
import { DEFAULT_LIMIT } from '../utils/common';
import { DEFAULT_PAGE } from '../utils/common';

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

export const getReqAccounts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const schema = Joi.object({
      page: Joi.number().min(1).optional(),
      limit: Joi.number().min(1).optional(),
      hasUsedAspire: Joi.boolean().optional(),
      requestedDateFrom: Joi.date().iso().optional(),
      requestedDateTo: Joi.date().iso().min(Joi.ref('requestedDateFrom')).optional(),
      searchValue: Joi.string().allow('').optional(),
    });

    const { error } = schema.validate(req.query);
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

    const page = parseInt(req.query.page as string) || DEFAULT_PAGE;
    const limit = parseInt(req.query.limit as string) || DEFAULT_LIMIT;
    const filters: any = {
      hasUsedAspire: req.query.hasUsedAspire,
      requestedDateFrom: req.query.requestedDateFrom,
      requestedDateTo: req.query.requestedDateTo,
      searchValue: req.query.searchValue,
    };

    const { requestedAccounts, total, totalPages } = await getRequestedAccountsList(
      page,
      limit,
      filters
    );
    
    sendResponse(
      res,
      200,
      true,
      Message.GET_REQUESTED_ACCOUNTS_SUCCESS,
      {
        data: requestedAccounts,
        total,
        totalPages,
        currentPage: page,
        limit 
      }
    );
  } catch (error: any) {
    console.error('Error getting requested accounts:', error);
    sendResponse(
      res,
      500,
      false,
      Message.GET_REQUESTED_ACCOUNTS_ERROR,
      undefined,
      error
    );
  }
};

export const generateReqAccountToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const schema = Joi.object({
    requestedAccountId: Joi.number().required()
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
        error.details
      );
      return;
    }

    const { requestedAccountId } = req.body;
    const updatedAccount = await generateRequestAccountToken(requestedAccountId);

    sendResponse(
      res,
      200,
      true,
      Message.GENERATE_TOKEN_SUCCESS,
      updatedAccount
    );
  } catch (error: any) {
    if (error.message === Message.REQUESTED_ACCOUNT_NOT_FOUND) {
      sendResponse(res, 404, false, error.message);
      return;
    }
    sendResponse(
      res,
      500,
      false,
      Message.COMMON_ERROR,
      undefined,
      error
    );
  }
};

export const verifyReqAccountToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const schema = Joi.object({
    token: Joi.string().required()
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
        error.details
      );
      return;
    }

    const { token } = req.body;
    const requestedAccount = await verifyRequestAccountToken(token);

    sendResponse(
      res,
      200,
      true,
      Message.VALIDATE_TOKEN_SUCCESS,
      requestedAccount
    );
  } catch (error: any) {
    if (error.message === Message.INVALID_TOKEN) {
      sendResponse(res, 400, false, error.message);
      return;
    }
    sendResponse(
      res,
      500,
      false,
      Message.COMMON_ERROR,
      undefined,
      error
    );
  }
};
