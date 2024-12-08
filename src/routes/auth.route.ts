import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

const router = Router();

router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-token', authController.verifyForgotPasswordToken);
router.post('/reset-password', authController.resetPassword);

export default router; 