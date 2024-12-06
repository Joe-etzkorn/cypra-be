import { Router } from 'express';
import { SuperAdminAuthMiddleware, AdminAuthMiddleware } from '../middleware/auth.middleware';
import { requestedAccountController } from '../controllers/requested-account.controller';
import { RequestedAccountService } from '../services/requested-account.service';

const router = Router();

router.post('/', requestedAccountController.createReqAccount);
router.get('/', SuperAdminAuthMiddleware, requestedAccountController.getReqAccounts);
router.post('/generate-token', SuperAdminAuthMiddleware, requestedAccountController.generateReqAccountToken);
router.post('/verify-token', requestedAccountController.verifyRequestAccountToken);

export default router;