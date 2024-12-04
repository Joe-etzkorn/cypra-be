import { Router } from 'express';
import { SuperAdminAuthMiddleware, AdminAuthMiddleware } from '../middleware/auth.middleware';
import { RequestedAccountController } from '../controllers/requested-account.controller';
import { RequestedAccountService } from '../services/requested-account.service';

const router = Router();

const service = new RequestedAccountService();
const controller = new RequestedAccountController(service);

// Bind the methods to maintain 'this' context
router.post('/', controller.createReqAccount.bind(controller));
router.get('/', SuperAdminAuthMiddleware, controller.getReqAccounts.bind(controller));
router.post('/generate-token', SuperAdminAuthMiddleware, controller.generateReqAccountToken.bind(controller));
router.post('/verify-token', controller.verifyRequestAccountToken.bind(controller));

export default router;