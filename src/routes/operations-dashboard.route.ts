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
  '/crew-report-table',
  AdminAuthMiddleware,
  operationDashboardController.getCrewReportsTable,
);
router.get(
  '/top-services-table',
  AdminAuthMiddleware,
  operationDashboardController.getTopServicesReportTable,
);


router.get(
  '/report/crew-leader',
  AdminAuthMiddleware,
  operationDashboardController.getCrewLeaderReport,
);
router.get(
  '/report/crew-leader/table-view',
  AdminAuthMiddleware,
  operationDashboardController.getCrewLeaderTable,
);
router.get(
  '/report/crew-leader/chart-efficiency-warranty-hours',
  AdminAuthMiddleware,
  operationDashboardController.getChartLaborEfficiencyAndWarrantyHours,
);
router.get(
  '/report/crew-leader/chart-efficiency-earned-revenue',
  AdminAuthMiddleware,
  operationDashboardController.getChartLaborEfficiencyAndEarnedRevenue,
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
