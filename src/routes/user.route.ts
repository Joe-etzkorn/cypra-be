import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { AdminAuthMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/', userController.create);
router.put('/:id', AdminAuthMiddleware, userController.update);
router.post('/profile', AdminAuthMiddleware, userController.getProfile);

export default router;
