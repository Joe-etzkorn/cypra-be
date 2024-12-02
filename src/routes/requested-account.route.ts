import { Router } from 'express';
import { createReqAccount, generateReqAccountToken, getReqAccounts, verifyReqAccountToken } from '../controllers/requested-account.controller';
import { SuperAdminAuthMiddleware, AdminAuthMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/', createReqAccount);

router.get('/', SuperAdminAuthMiddleware, getReqAccounts);
router.post('/generate-token', SuperAdminAuthMiddleware, generateReqAccountToken);
router.post('/verify-token', verifyReqAccountToken);

export default router;
