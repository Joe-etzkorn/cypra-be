import { Response } from 'express';
import { sendResponse } from '../utils/response';
import { Message } from '../enums/message.enum';
import { SalesDashboardService } from '../services/sales-dashboard.service';
import { AdminAuthenticatedRequest } from '../interfaces/user.interface';
import { OperationsReportOpportunitiesCompletedService } from '../services/operations-report-opportunities-completed.service';
import { OperationsReportServiceService } from '../services/operations-report-services.service';

class OperationDashboardController {
  constructor(
    private salesDashboardService: SalesDashboardService,
    private operationsReportOpportunitiesCompletedService: OperationsReportOpportunitiesCompletedService,
    private operationsReportServiceService: OperationsReportServiceService,
  ) {}

  getDashboardData = async (
    req: AdminAuthenticatedRequest,
    res: Response,
  ): Promise<any> => {
    try {
      if (!req.user) return;

      const data = await this.salesDashboardService.getDashboardData(
        req.user,
        req.params,
      );
      sendResponse(res, 200, true, Message.COMMON_SUCCESS, data);
    } catch (error: any) {
      sendResponse(res, 400, false, error.message, undefined, error);
    }
  };

  getReportServices = async (
    req: AdminAuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    try {
      if (!req.user) return;

      const data = await this.operationsReportServiceService.getReportServices(
        req.user,
      );
      sendResponse(res, 200, true, Message.COMMON_SUCCESS, data);
    } catch (error: any) {
      sendResponse(res, 400, false, error.message, undefined, error);
    }
  };

  getReportCompletedOpportunities = async (
    req: AdminAuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    try {
      if (!req.user) return;

      const data =
        await this.operationsReportOpportunitiesCompletedService.getReportCompletedOpportunities(
          req.user,
          req.params,
        );
      sendResponse(res, 200, true, Message.COMMON_SUCCESS, data);
    } catch (error: any) {
      sendResponse(res, 400, false, error.message, undefined, error);
    }
  };
  getReportCompletedTableView = async (
    req: AdminAuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    try {
      if (!req.user) return;

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const data =
        await this.operationsReportOpportunitiesCompletedService.getReportCompletedTableView(
          req.user,
          page,
          limit,
        );
      sendResponse(res, 200, true, Message.COMMON_SUCCESS, data);
    } catch (error: any) {
      sendResponse(res, 400, false, error.message, undefined, error);
    }
  };
}

const salesDashboardService = new SalesDashboardService();
const operationsReportOpportunitiesCompletedService =
  new OperationsReportOpportunitiesCompletedService();
const operationsReportServiceService = new OperationsReportServiceService();
export const operationDashboardController = new OperationDashboardController(
  salesDashboardService,
  operationsReportOpportunitiesCompletedService,
  operationsReportServiceService,
);
