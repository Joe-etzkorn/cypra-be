import { Response } from 'express';
import { sendResponse } from '../utils/response';
import { Message } from '../enums/message.enum';
import { SalesDashboardService } from '../services/sales-dashboard.service';
import { SalesReportPipelineService } from '../services/sales-report-pipeline.service';
import { AdminAuthenticatedRequest } from '../interfaces/user.interface';
import { SalesReportOpportunitiesWonService } from '../services/sales-report-opportunities-won.service';

class SalesDashboardController {
  constructor(
    private salesDashboardService: SalesDashboardService,
    private salesReportPipelineService: SalesReportPipelineService,
    private salesReportOpportunitiesWonService: SalesReportOpportunitiesWonService,
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
  getReportPipelineData = async (
    req: AdminAuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    try {
      if (!req.user) return;

      const data = await this.salesReportPipelineService.getReport(
        req.user,
        req.params,
      );
      sendResponse(res, 200, true, Message.COMMON_SUCCESS, data);
    } catch (error: any) {
      sendResponse(res, 400, false, error.message, undefined, error);
    }
  };
  getBiddingDeliveryTable = async (
    req: AdminAuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    try {
      if (!req.user) return;

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const type = (req.query.type as 'bidding' | 'delivered') || 'bidding';

      const data =
        await this.salesReportPipelineService.getBiddingDeliveryTable(
          req.user,
          page,
          limit,
          type,
        );
      sendResponse(res, 200, true, Message.COMMON_SUCCESS, data);
    } catch (error: any) {
      sendResponse(res, 400, false, error.message, undefined, error);
    }
  };
  getWonLostSummary = async (
    req: AdminAuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    try {
      if (!req.user) return;

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const data = await this.salesReportPipelineService.getWonLostSummary(
        req.user,
        page,
        limit,
      );
      sendResponse(res, 200, true, Message.COMMON_SUCCESS, data);
    } catch (error: any) {
      sendResponse(res, 400, false, error.message, undefined, error);
    }
  };

  getReportWonData = async (
    req: AdminAuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    try {
      if (!req.user) return;

      const data = await this.salesReportOpportunitiesWonService.getDashboardData(
        req.user,
        req.params,
      );
      sendResponse(res, 200, true, Message.COMMON_SUCCESS, data);
    } catch (error: any) {
      sendResponse(res, 400, false, error.message, undefined, error);
    }
  };

  getReportWonTableView = async (
    req: AdminAuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    try {
      if (!req.user) return;

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const data = await this.salesReportOpportunitiesWonService.getReportWonTableView(
        req.user,
        page,
        limit,
      );
      sendResponse(res, 200, true, Message.COMMON_SUCCESS, data);
    } catch (error: any) {
      sendResponse(res, 400, false, error.message, undefined, error);
    }
  };

  getReportCustomerDetailData = async (
    req: AdminAuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
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
}

const salesDashboardService = new SalesDashboardService();
const salesReportPipelineService = new SalesReportPipelineService();
const salesReportOpportunitiesWonService =
  new SalesReportOpportunitiesWonService();
export const salesDashboardController = new SalesDashboardController(
  salesDashboardService,
  salesReportPipelineService,
  salesReportOpportunitiesWonService,
);
