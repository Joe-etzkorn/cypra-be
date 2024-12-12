import { Router } from 'express';
import { AdminAuthMiddleware } from '../middleware/auth.middleware';
import { AdminAuthenticatedRequest } from '../interfaces/user.interface';
import { operationDashboardController } from '../controllers/operations-dashboard.controller';

const router = Router();

router.get(
  '/',
  AdminAuthMiddleware,
  operationDashboardController.getDashboardData,
);

router.get(
  '/report/services',
  AdminAuthMiddleware,
  operationDashboardController.getReportServices,
);

router.get(
  '/report/completed-opportunities',
  AdminAuthMiddleware,
  operationDashboardController.getReportCompletedOpportunities,
);
router.get(
  '/report/completed-opportunities/table-view',
  AdminAuthMiddleware,
  operationDashboardController.getReportCompletedTableView,
);

export default router;
