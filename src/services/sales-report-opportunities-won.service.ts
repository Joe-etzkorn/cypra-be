import { Op, Sequelize } from 'sequelize';
import Opportunity from '../models/opportunity.model';
import { CognitoUser } from '../interfaces/user.interface';
import User from '../models/user.model';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../utils/common';

export class SalesReportOpportunitiesWonService {
  async getDashboardData(cognitoUser: CognitoUser, _filter: any): Promise<any> {
    try {
      const response = await this.calculate(cognitoUser.companyId);
      return response;
    } catch (error) {
      console.error('Error getting sales dashboard:', error);
      throw error;
    }
  }
  async getReportWonTableView(
    cognitoUser: CognitoUser,
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_LIMIT,
  ): Promise<any> {
    try {
      const totalWon = await Opportunity.count({
        where: {
          companyId: cognitoUser.companyId,
          opportunityStatusName: 'Won',
        },
      });
      const wonOpportunities = await Opportunity.findAll({
        where: {
          companyId: cognitoUser.companyId,
          opportunityStatusName: 'Won',
        },
        limit,
        offset: (page - 1) * limit,
      });
      const tableData = wonOpportunities.map((opportunity, index) => {
        const estimatedRevenue = opportunity.estimatedDollars ?? 0;
        const estimatedCost = opportunity.estimatedCostDollars ?? 0;
        const estimatedHours = opportunity.estimatedLaborHours ?? 0;
        const estimatedGrossProfit = estimatedRevenue - estimatedCost;

        return {
          key: index + 1,
          salesRepresentative: opportunity.salesRepContactName || 'N/A',
          estimatedRevenue: estimatedRevenue,
          estimatedHours: estimatedHours,
          estimatedCosts: estimatedCost,
          estimatedGrossProfit: estimatedGrossProfit,
          estimatedGrossMargin: opportunity.estimatedGrossMarginPercent,
        };
      });

      return {
        table: tableData,
        total: totalWon,
        totalPages: Math.ceil(totalWon / limit),
        currentPage: page,
      };
    } catch (error) {
      console.error('Error getting sales dashboard:', error);
      throw error;
    }
  }
  private async calculate(userId: number) {
    const wonOpportunities = await Opportunity.findAll({
      where: {
        companyId: userId,
        opportunityStatusName: 'Won',
      },
    });

    const totals = wonOpportunities.reduce(
      (acc, opportunity) => {
        acc.estimatedRevenue += opportunity.estimatedDollars ?? 0;
        acc.estimatedCost += opportunity.estimatedCostDollars ?? 0;
        acc.estimatedHours += opportunity.estimatedLaborHours ?? 0;
        return acc;
      },
      { estimatedRevenue: 0, estimatedCost: 0, estimatedHours: 0 },
    );

    const estimatedGrossProfit = totals.estimatedRevenue - totals.estimatedCost;

    const estimatedGrossMarginPercent = await
      this.calculateEstimatedGrossMarginByOpportunities(wonOpportunities);

    return {
      common: {
        count: wonOpportunities.length,
      },
      estimatedRevenue: {
        total: totals.estimatedRevenue,
      },
      estimatedGrossProfit: {
        total: estimatedGrossProfit,
      },
      estimatedGrossMarin: {
        count: estimatedGrossMarginPercent,
      },
      estimatedHours: {
        total: totals.estimatedHours,
      },
    };
  }

  private async calculateEstimatedGrossMarginByOpportunities(
    opportunities: Opportunity[],
  ) {
    let estimatedGrossMargin = opportunities.reduce(
      (acc, opportunity) => {
        const estimatedDollars = opportunity.estimatedDollars ?? 0;
        const estimatedCostDollars = opportunity.estimatedCostDollars ?? 0;
        acc.totalEstimatedDollars += estimatedDollars;
        acc.totalEstimatedCostDollars += estimatedCostDollars;
        return acc;
      },
      { totalEstimatedDollars: 0, totalEstimatedCostDollars: 0 },
    );

    let estimatedGrossMarginPercent = 0;
    if (estimatedGrossMargin.totalEstimatedDollars > 0) {
      estimatedGrossMarginPercent =
        ((estimatedGrossMargin.totalEstimatedDollars -
          estimatedGrossMargin.totalEstimatedCostDollars) /
          estimatedGrossMargin.totalEstimatedDollars) *
        100;
    }

    return estimatedGrossMarginPercent;
  }
}
