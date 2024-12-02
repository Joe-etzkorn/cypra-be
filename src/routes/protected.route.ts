import { Router, Request, Response } from 'express';
import { AdminAuthMiddleware } from '../middleware/auth.middleware';
import { sendResponse } from '../utils/response';

const router = Router();

interface AuthenticatedRequest extends Request {
  user?: string | object;
}

router.get(
  '/check',
  AdminAuthMiddleware,
  (req: AuthenticatedRequest, res: Response) => {
    sendResponse(res, 200, true, 'This is a protected route', {
      user: req.user,
    });
  },
);

export default router;
