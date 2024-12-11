import { Request, Response } from 'express';
import { sendResponse } from '../utils/response';
import { Message } from '../enums/message.enum';
import { SalesDashboardService } from '../services/sales-dashboard.service';
import { SalesReportPipelineService } from '../services/sales-report-pipeline.service';
import { CognitoUser } from '../interfaces/user.interface';

interface AuthenticatedRequest extends Request {
  user: CognitoUser;
}

class SalesDashboardController {
  constructor(
    private salesDashboardService: SalesDashboardService,
    private salesReportPipelineService: SalesReportPipelineService,
  ) {}

  getDashboardData = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const data = await this.salesDashboardService.getDashboardData(req?.user, req.params);
      sendResponse(res, 200, true, Message.COMMON_SUCCESS, data);
    } catch (error: any) {
      sendResponse(res, 400, false, error.message, undefined, error);
    }
  };
  getReportPipelineData = async (
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    try {
      const data = await this.salesReportPipelineService.getReport(req?.user, req.params);
      sendResponse(res, 200, true, Message.COMMON_SUCCESS, data);
    } catch (error: any) {
      sendResponse(res, 400, false, error.message, undefined, error);
    }
  };
  getReportWonData = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const data = await this.salesDashboardService.getDashboardData(req?.user, req.params);
      sendResponse(res, 200, true, Message.COMMON_SUCCESS, data);
    } catch (error: any) {
      sendResponse(res, 400, false, error.message, undefined, error);
    }
  };
  getReportCustomerDetailData = async (
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    try {
      const data = await this.salesDashboardService.getDashboardData(req?.user, req.params);
      sendResponse(res, 200, true, Message.COMMON_SUCCESS, data);
    } catch (error: any) {
      sendResponse(res, 400, false, error.message, undefined, error);
    }
  };
}

const salesDashboardService = new SalesDashboardService();
const salesReportPipelineService = new SalesReportPipelineService();
export const salesDashboardController = new SalesDashboardController(
  salesDashboardService,
  salesReportPipelineService,
);
