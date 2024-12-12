import { Router, Request, Response } from 'express';
import { AdminAuthMiddleware } from '../middleware/auth.middleware';
import { sendResponse } from '../utils/response';
import { AdminAuthenticatedRequest } from '../interfaces/user.interface';

const router = Router();

router.get(
  '/check',
  AdminAuthMiddleware,
  (req: AdminAuthenticatedRequest, res: Response) => {
    sendResponse(res, 200, true, 'This is a protected route', {
      user: req.user,
    });
  },
);

export default router;
