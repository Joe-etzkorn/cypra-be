import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { AdminAuthMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.put('/toggle-admin', AdminAuthMiddleware, userController.toggleAdminPrivilege);
router.post('/', userController.create);
router.put('/:userCognitoId', AdminAuthMiddleware, userController.update);
router.post('/profile', AdminAuthMiddleware, userController.getProfile);
router.get('/company-users', AdminAuthMiddleware, userController.getCompanyUsers);
router.delete('/', AdminAuthMiddleware, userController.delete);

export default router;
