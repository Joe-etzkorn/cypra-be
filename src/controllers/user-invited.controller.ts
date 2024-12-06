import { Request, Response } from 'express';
import { sendResponse } from '../utils/response';
import { Message } from '../enums/message.enum';
import { UserInviteService } from '../services/user-invited.service';
import { userInviteValidation } from '../validations/user-invited.validation';

interface AuthenticatedRequest extends Request {
  user?: any;
}

class UserInviteController {
  constructor(private userInviteService: UserInviteService) {}

  inviteUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { error } = userInviteValidation.inviteUser.validate(req.body);
      if (error) {
        sendResponse(res, 400, false, Message.VALIDATION_ERROR, undefined, error.details);
        return;
      }

      const invitedUserId = parseInt(req.params.invitedUserId);

      const invitation = await this.userInviteService.inviteUser(req.body, invitedUserId);
  
      sendResponse(res, 201, true, Message.CREATE_INVITATION_SUCCESS, invitation);
    } catch (error: any) {
      if (error.message === Message.EMAIL_ALREADY_EXISTS) {
        sendResponse(res, 400, false, error.message);
        return;
      }
      if (error.message === Message.EMAIL_ALREADY_INVITED) {
        sendResponse(res, 400, false, error.message);
        return;
      }
      sendResponse(res, 500, false, Message.COMMON_ERROR, undefined, error);
    }
  };

  verifyInviteToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const { error } = userInviteValidation.verifyToken.validate(req.body);
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
      const userInvitation =
        await this.userInviteService.verifyInviteToken(token);

      sendResponse(
        res,
        200,
        true,
        Message.VALIDATE_TOKEN_SUCCESS,
        userInvitation,
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

const userInviteService = new UserInviteService();
export const userInviteController = new UserInviteController(userInviteService); 