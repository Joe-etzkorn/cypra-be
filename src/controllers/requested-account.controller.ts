import { Request, Response } from 'express';
import { sendResponse } from '../utils/response';
import Joi from 'joi';
import { JwtPayload } from 'jsonwebtoken';
import { Message } from '../enums/message.enum';
import { RequestedAccountService } from '../services/requested-account.service';
import { DEFAULT_LIMIT } from '../utils/common';
import { DEFAULT_PAGE } from '../utils/common';
import { requestAccountValidation } from '../validations/request-account.validation';

export class RequestedAccountController {
  constructor(private requestedAccountService: RequestedAccountService) {}

  async createReqAccount(req: Request, res: Response): Promise<void> {
    try {
      const { error } = requestAccountValidation.createRequestAccount.validate(
        req.body,
      );
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

      const requestedAccount =
        await this.requestedAccountService.createRequestAccount(req.body);
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
  }

  async getReqAccounts(req: Request, res: Response): Promise<void> {
    try {
      const { error } = requestAccountValidation.getRequestedAccount.validate(
        req.query,
      );
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

      const { requestedAccounts, total, totalPages } =
        await this.requestedAccountService.getRequestedAccountsList(
          page,
          limit,
          filters,
        );

      sendResponse(res, 200, true, Message.GET_REQUESTED_ACCOUNTS_SUCCESS, {
        data: requestedAccounts,
        total,
        totalPages,
        currentPage: page,
        limit,
      });
    } catch (error: any) {
      console.error('Error getting requested accounts:', error);
      sendResponse(
        res,
        500,
        false,
        Message.GET_REQUESTED_ACCOUNTS_ERROR,
        undefined,
        error,
      );
    }
  }

  async generateReqAccountToken(req: Request, res: Response): Promise<void> {
    try {
      const { error } = requestAccountValidation.generateToken.validate(
        req.body,
      );
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

      const { requestedAccountId } = req.body;
      const updatedAccount =
        await this.requestedAccountService.generateRequestAccountToken(
          requestedAccountId,
        );

      sendResponse(
        res,
        200,
        true,
        Message.GENERATE_TOKEN_SUCCESS,
        updatedAccount,
      );
    } catch (error: any) {
      if (error.message === Message.REQUESTED_ACCOUNT_NOT_FOUND) {
        sendResponse(res, 404, false, error.message);
        return;
      }
      sendResponse(res, 500, false, Message.COMMON_ERROR, undefined, error);
    }
  }

  async verifyRequestAccountToken(req: Request, res: Response): Promise<void> {
    try {
      const { error } = requestAccountValidation.verifyToken.validate(req.body);
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

      const { token } = req.body;
      const requestedAccount =
        await this.requestedAccountService.verifyRequestAccountToken(token);

      sendResponse(
        res,
        200,
        true,
        Message.VALIDATE_TOKEN_SUCCESS,
        requestedAccount,
      );
    } catch (error: any) {
      if (error.message === Message.INVALID_TOKEN) {
        sendResponse(res, 400, false, error.message);
        return;
      }
      sendResponse(res, 500, false, Message.COMMON_ERROR, undefined, error);
    }
  }
}
