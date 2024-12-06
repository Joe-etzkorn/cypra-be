
import { Router } from 'express';
import { userInviteController } from '../controllers/user-invited.controller';
import { AdminAuthMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/verify-token', userInviteController.verifyInviteToken);
router.post('/:invitedUserId', AdminAuthMiddleware, userInviteController.inviteUser);

export default router;
