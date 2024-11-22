import { Request, Response } from 'express';
import { loginUser } from '../services/auth.service';
import Joi from 'joi';
import { sendResponse } from '../utils/response';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate({ email, password });

  if (error) {
    sendResponse(res, 400, false, 'Invalid input', undefined, error.details);
    return;
  }

  try {
    const tokens = await loginUser(email, password);

    if (tokens) {
      sendResponse(res, 200, true, 'Login successful', {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    } else {
      sendResponse(res, 401, false, 'Invalid credentials');
    }
  } catch (err) {
    console.error('Login error:', err);
    sendResponse(res, 500, false, 'Internal server error', undefined, err);
  }
};
