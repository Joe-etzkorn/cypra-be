import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';

const router = Router();

const service = new UserService();
const controller = new UserController(service);

router.post('/', controller.create.bind(controller));

export default router;
