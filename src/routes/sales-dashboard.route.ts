
import { Router } from 'express';
import { salesDashboardController } from '../controllers/sales-dashboard.controller';

const router = Router();

router.post('/', salesDashboardController.getDashboardData);
router.post('/report/pipeline', salesDashboardController.getReportPipelineData);

export default router;
