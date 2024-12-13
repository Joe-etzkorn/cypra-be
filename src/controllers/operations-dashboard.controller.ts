import { Response } from 'express';
import { sendResponse } from '../utils/response';
import { Message } from '../enums/message.enum';
import { AdminAuthenticatedRequest } from '../interfaces/user.interface';
import { OperationsReportOpportunitiesCompletedService } from '../services/operations-report-opportunities-completed.service';
import { OperationsReportServicesService } from '../services/operations-report-services.service';
import { OperationsDashboardService } from '../services/operations-dashboard.service';
import { OperationsReportCrewLeaderService } from '../services/operations-report-crew-leader.service';

class OperationDashboardController {
  constructor(
    private operationsDashboardService: OperationsDashboardService,
    private operationsReportOpportunitiesCompletedService: OperationsReportOpportunitiesCompletedService,
    private operationsReportServicesService: OperationsReportServicesService,
    private operationsReportCrewLeaderService: OperationsReportCrewLeaderService,
  ) {}

  getDashboardData = async (
    req: AdminAuthenticatedRequest,
    res: Response,
  ): Promise<any> => {
    try {
      if (!req.user) return;

      const data = await this.operationsDashboardService.getDashboardData(
        req.user,
        req.params,
      );
      sendResponse(res, 200, true, Message.COMMON_SUCCESS, data);
    } catch (error: any) {
      sendResponse(res, 400, false, error.message, undefined, error);
    }
  };
  getCrewReportsTable = async (
    req: AdminAuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    try {
      if (!req.user) return;

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const data = await this.operationsDashboardService.getCrewReportsTable(
        req.user,
        page,
        limit,
      );
      sendResponse(res, 200, true, Message.COMMON_SUCCESS, data);
    } catch (error: any) {
      sendResponse(res, 400, false, error.message, undefined, error);
    }
  };
  getTopServicesReportTable = async (
    req: AdminAuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    try {
      if (!req.user) return;

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const data =
        await this.operationsDashboardService.getTopServicesReportTable(
          req.user,
          page,
          limit,
        );
      sendResponse(res, 200, true, Message.COMMON_SUCCESS, data);
    } catch (error: any) {
      sendResponse(res, 400, false, error.message, undefined, error);
    }
  };

  getCrewLeaderReport = async (
    req: AdminAuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    try {
      if (!req.user) return;

      const data =
        await this.operationsReportCrewLeaderService.getDashboardData(
          req.user,
          req.params,
        );
      sendResponse(res, 200, true, Message.COMMON_SUCCESS, data);
    } catch (error: any) {
      sendResponse(res, 400, false, error.message, undefined, error);
    }
  };
  getCrewLeaderTable = async (
    req: AdminAuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    try {
      if (!req.user) return;

      const data =
        await this.operationsReportCrewLeaderService.getCrewLeaderTable(
          req.user,
        );
      sendResponse(res, 200, true, Message.COMMON_SUCCESS, data);
    } catch (error: any) {
      sendResponse(res, 400, false, error.message, undefined, error);
    }
  };
  getChartLaborEfficiencyAndWarrantyHours = async (
    req: AdminAuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    try {
      if (!req.user) return;

      const data =
        await this.operationsReportCrewLeaderService.getChartLaborEfficiencyAndWarrantyHours(
          req.user,
          req.params,
        );
      sendResponse(res, 200, true, Message.COMMON_SUCCESS, data);
    } catch (error: any) {
      sendResponse(res, 400, false, error.message, undefined, error);
    }
  };
  getChartLaborEfficiencyAndEarnedRevenue = async (
    req: AdminAuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    try {
      if (!req.user) return;

      const data =
        await this.operationsReportCrewLeaderService.getChartLaborEfficiencyAndEarnedRevenue(
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

      const data = await this.operationsReportServicesService.getReportServices(
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

const operationsDashboardService = new OperationsDashboardService();
const operationsReportOpportunitiesCompletedService =
  new OperationsReportOpportunitiesCompletedService();
const operationsReportServicesService = new OperationsReportServicesService();
const operationsReportCrewLeaderService =
  new OperationsReportCrewLeaderService();
export const operationDashboardController = new OperationDashboardController(
  operationsDashboardService,
  operationsReportOpportunitiesCompletedService,
  operationsReportServicesService,
  operationsReportCrewLeaderService,
);
