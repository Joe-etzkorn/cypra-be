import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';

const router = Router();

const service = new AuthService();
const controller = new AuthController(service);

router.post('/login', controller.login.bind(controller));

export default router; 