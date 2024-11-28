import { Router } from 'express';
import { createReqAccount } from '../controllers/requested-account.controller';

const router = Router();

router.post('/', createReqAccount);

export default router;
