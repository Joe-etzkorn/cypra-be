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
  }
}

const authService = new AuthService();
export const authController = new AuthController(authService);
