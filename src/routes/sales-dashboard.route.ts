import { Router } from 'express';
import { salesDashboardController } from '../controllers/sales-dashboard.controller';
import { AdminAuthMiddleware } from '../middleware/auth.middleware';
import { AdminAuthenticatedRequest } from '../interfaces/user.interface';

const router = Router();

router.get('/', AdminAuthMiddleware, salesDashboardController.getDashboardData);

router.get(
  '/report/pipeline',
  AdminAuthMiddleware,
  salesDashboardController.getReportPipelineData,
);
router.get(
  '/report/pipeline/bidding-delivery-table',
  AdminAuthMiddleware,
  salesDashboardController.getBiddingDeliveryTable,
);

router.get(
  '/report/pipeline/won-lost',
  AdminAuthMiddleware,
  salesDashboardController.getWonLostSummary,
);


router.get(
  '/report/opportunities-won',
  AdminAuthMiddleware,
  salesDashboardController.getReportWonData,
);

router.get(
  '/report/opportunities-won/table-view',
  AdminAuthMiddleware,
  salesDashboardController.getReportWonTableView,
);

export default router;
