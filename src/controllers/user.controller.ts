import { Request, Response } from 'express';
import { sendResponse } from '../utils/response';
import Joi from 'joi';
import { JwtPayload } from 'jsonwebtoken';
import { Message } from '../enums/message.enum';
import { UserService } from '../services/user.service';
import { userValidation } from '../validations/user.validation';

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

class UserController {
  constructor(private userService: UserService) {}

  create = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { error } = userValidation.createUser.validate(req.body);
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

      const user = await this.userService.createUser(req.body);
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
      sendResponse(
        res,
        500,
        false,
        Message.CREATE_USER_ERROR,
        undefined,
        error,
      );
    }
  };

  update = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const userCognitoId = req.params.userCognitoId;
      
      const { error } = userValidation.updateUser.validate(req.body);
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

      const user = await this.userService.updateUser(userCognitoId, req.body);
      sendResponse(res, 200, true, Message.UPDATE_USER_SUCCESS, user);
    } catch (error: any) {
      if (error.message === Message.USER_NOT_FOUND) {
        sendResponse(res, 404, false, error.message);
        return;
      }
      sendResponse(
        res,
        500,
        false,
        Message.UPDATE_USER_ERROR,
        undefined,
        error,
      );
    }
  };

  getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { email } = req.body;

      const user = await this.userService.getProfile(email);
      sendResponse(res, 200, true, Message.COMMON_SUCCESS, user);
    } catch (error: any) {
      if (error.message === Message.USER_NOT_FOUND) {
        sendResponse(res, 404, false, error.message);
        return;
      }
      sendResponse(
        res,
        500,
        false,
        Message.COMMON_ERROR,
        undefined,
        error,
      );
    }
  };

  getCompanyUsers = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.query.userId as string);

      const { error } = userValidation.getCompanyUsers.validate(req.query);
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

      const users = await this.userService.getCompanyUsers(userId);
      sendResponse(res, 200, true, Message.COMMON_SUCCESS, users);
    } catch (error: any) {
      sendResponse(
        res,
        500,
        false,
        Message.COMMON_ERROR,
        undefined,
        error
      );
    }
  }

  delete = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {

      const userCognitoId = req.body.userCognitoId;
      const adminId = parseInt(req.body.adminId);
      
      await this.userService.deleteUser(userCognitoId, adminId);
      sendResponse(res, 200, true, Message.DELETE_USER_SUCCESS);
    } catch (error: any) {
      if (error.message === Message.USER_NOT_FOUND) {
        sendResponse(res, 404, false, error.message);
        return;
      }
      if (error.message === Message.PERMISSION_DENIED) {
        sendResponse(res, 403, false, error.message);
        return;
      }
      if (error.message === Message.PERMISSION_DENIED) {
        sendResponse(res, 400, false, error.message);
        return;
      }
      if (error.message === Message.PERMISSION_DENIED) {
        sendResponse(res, 400, false, error.message);
        return;
      }
      sendResponse(
        res,
        500,
        false,
        Message.DELETE_USER_ERROR,
        undefined,
        error,
      );
    }
  };

  toggleAdminPrivilege = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { userId, adminId, isAdministrator } = req.body;
  
      const { error } = userValidation.toggleAdminPrivilege.validate({
        userId,
        adminId,
        isAdministrator
      });
  
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
  
      const updatedUser = await this.userService.toggleAdminPrivilege(userId, adminId, isAdministrator);
      sendResponse(res, 200, true, Message.UPDATE_USER_SUCCESS, updatedUser);
    } catch (error: any) {
      if (error.message === Message.USER_NOT_FOUND) {
        sendResponse(res, 404, false, error.message);
        return;
      }
      if (error.message === Message.PERMISSION_DENIED) {
        sendResponse(res, 403, false, error.message);
        return;
      }
      sendResponse(
        res,
        500,
        false,
        Message.UPDATE_USER_ERROR,
        undefined,
        error
      );
    }
  };
}

const userService = new UserService();
export const userController = new UserController(userService);
