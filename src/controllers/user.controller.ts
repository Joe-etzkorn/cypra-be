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

export class UserController {
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
}
