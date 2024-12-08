import { Request, Response } from 'express';
import Joi from 'joi';
import { sendResponse } from '../utils/response';
import { Message } from '../enums/message.enum';
import { AuthService } from '../services/auth.service';
import { authValidation } from '../validations/auth.validate';

class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response): Promise<void> => {
    const { email, password, isSuperAdmin = false } = req.body;

    const { error } = authValidation.login.validate({
      email,
      password,
      isSuperAdmin,
    });

    if (error) {
      sendResponse(res, 400, false, 'Invalid input', undefined, error.details);
      return;
    }

    try {
      const result = await this.authService.login(
        email,
        password,
        isSuperAdmin,
      );

      if (result) {
        sendResponse(res, 200, true, 'Login successful', {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          ...(result.clientCredentials && {
            clientCredentials: result.clientCredentials,
          }),
        });
      } else {
        sendResponse(
          res,
          400,
          false,
          'Invalid credentials or unauthorized role',
        );
      }
    } catch (err: any) {
      if (err.message === Message.PERMISSION_DENIED) {
        sendResponse(res, 403, false, Message.PERMISSION_DENIED);
        return;
      }
      console.error('Login error:', err);
      sendResponse(res, 500, false, 'Internal server error', undefined, err);
    }
  };

  forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    const { error } = authValidation.forgotPassword.validate({ email });

    if (error) {
      sendResponse(
        res,
        400,
        false,
        Message.EMAIL_REQUIRED,
        undefined,
        error.details,
      );
      return;
    }

    try {
      await this.authService.forgotPassword(email);

      sendResponse(res, 200, true, Message.RESET_PASSWORD_EMAIL_SENT);
    } catch (err: any) {
      if (err.message === Message.EMAIL_NOT_FOUND) {
        sendResponse(res, 404, false, Message.EMAIL_NOT_FOUND);
        return;
      }
      console.error('Forgot password error:', err);
      sendResponse(res, 500, false, Message.RESET_PASSWORD_ERROR);
    }
  };

  verifyForgotPasswordToken = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { token } = req.body;

    const { error } = authValidation.verifyForgotPasswordToken.validate({
      token,
    });

    if (error) {
      sendResponse(
        res,
        400,
        false,
        Message.INVALID_TOKEN,
        undefined,
        error.details,
      );
      return;
    }

    try {
      await this.authService.verifyResetPasswordToken(token);
      const user = await this.authService.verifyResetPasswordToken(token);

      sendResponse(res, 200, true, Message.VALIDATE_TOKEN_SUCCESS, user);
    } catch (err: any) {
      if (err.message === Message.INVALID_TOKEN) {
        sendResponse(res, 400, false, err.message);
        return;
      }
      console.error('Verify forgot password token error:', err);
      sendResponse(res, 500, false, Message.COMMON_ERROR);
    }
  };

  resetPassword = async (req: Request, res: Response): Promise<void> => {
    const { token, newPassword } = req.body;

    const { error } = authValidation.resetPassword.validate({
      token,
      newPassword,
    });

    if (error) {
      sendResponse(res, 400, false, Message.VALIDATION_ERROR, undefined, error.details);
      return;
    }

    try {
      await this.authService.resetPassword(token, newPassword);
      sendResponse(res, 200, true, Message.RESET_PASSWORD_SUCCESS);
    } catch (err: any) {
      if (err.message === Message.INVALID_TOKEN) {
        sendResponse(res, 400, false, err.message);
        return;
      }
      if (err.message === Message.USER_NOT_FOUND) {
        sendResponse(res, 404, false, err.message);
        return;
      } 
      sendResponse(res, 500, false, Message.COMMON_ERROR);
      console.error('Reset password error:', err);
    }
  }
}

const authService = new AuthService();
export const authController = new AuthController(authService);
