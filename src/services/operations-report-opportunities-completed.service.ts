import { Op } from 'sequelize';
import Opportunity from '../models/opportunity.model';
import { CognitoUser } from '../interfaces/user.interface';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../utils/common';

export class OperationsReportOpportunitiesCompletedService {
  async getReportCompletedOpportunities(
    cognitoUser: CognitoUser,
    _filter: any,
  ): Promise<any> {
    try {
      const response = await this.calculate(cognitoUser.companyId);
      return response;
    } catch (error) {
      console.error('Error getting operations dashboard:', error);
      throw error;
    }
  }
  async getReportCompletedTableView(
    cognitoUser: CognitoUser,
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_LIMIT,
  ): Promise<any> {
    try {
      const totalWon = await Opportunity.count({
        where: {
          companyId: cognitoUser.companyId,
          opportunityStatusName: 'Won',
          completeDate: {
            [Op.ne]: null,
          },
        },
      });
      const wonOpportunities = await Opportunity.findAll({
        where: {
          companyId: cognitoUser.companyId,
          opportunityStatusName: 'Won',
          completeDate: {
            [Op.ne]: null,
          },
        },
        limit,
        offset: (page - 1) * limit,
      });
      const tableData = wonOpportunities.map((opportunity, index) => {
        const actualRevenue = opportunity.actualEarnedRevenue ?? 0;
        const actualCost = opportunity.actualCostDollars ?? 0;
        const actualHours = opportunity.actualLaborHours ?? 0;
        const actualGrossProfit = actualRevenue - actualCost;

        return {
          key: index + 1,
          propertyName: opportunity.propertyName || 'N/A',
          actualRevenue: actualRevenue,
          actualHours: actualHours,
          actualCosts: actualCost,
          actualGrossProfit: actualGrossProfit,
          actualGrossMargin: opportunity.actualGrossMarginPercent,
        };
      });

      return {
        table: tableData,
        total: totalWon,
        totalPages: Math.ceil(totalWon / limit),
        currentPage: page,
      };
    } catch (error) {
      console.error('Error getting operations dashboard:', error);
      throw error;
    }
  }
  private async calculate(userId: number) {
    const completedOpportunities = await Opportunity.findAll({
      where: {
        companyId: userId,
        opportunityStatusName: 'Won',
        completeDate: {
          [Op.ne]: null,
        },
      },
    });

    const totals = completedOpportunities.reduce(
      (acc, opportunity) => {
        acc.actualRevenue += opportunity.actualEarnedRevenue ?? 0;
        acc.actualCost += opportunity.actualCostDollars ?? 0;
        const estimatedLaborHours = opportunity.estimatedLaborHours ?? 0;
        const actualLaborHours = opportunity.actualLaborHours ?? 0;
        if (estimatedLaborHours && actualLaborHours) {
          acc.totalLaborEfficiency +=
            (estimatedLaborHours / actualLaborHours) * 100;
          acc.countLaborEfficiency += 1;
        }
        return acc;
      },
      {
        actualRevenue: 0,
        actualCost: 0,
        totalLaborEfficiency: 0,
        countLaborEfficiency: 0,
      },
    );

    const laborEfficiency =
      totals.countLaborEfficiency > 0
        ? totals.totalLaborEfficiency / totals.countLaborEfficiency
        : 0;

    const actualGrossProfit = totals.actualRevenue - totals.actualCost;

    const actualGrossMarginPercent =
      await this.calculateActualGrossMarginByOpportunities(
        completedOpportunities,
      );

    return {
      common: {
        count: completedOpportunities.length,
      },
      actualRevenue: {
        total: totals.actualRevenue,
      },
      actualGrossProfit: {
        total: actualGrossProfit,
      },
      actualGrossMarin: {
        count: actualGrossMarginPercent,
      },
      laborEfficiency: {
        total: laborEfficiency,
      },
    };
  }

  private async calculateActualGrossMarginByOpportunities(
    opportunities: Opportunity[],
  ) {
    let actualGrossMargin = opportunities.reduce(
      (acc, opportunity) => {
        const actualDollars = opportunity.actualEarnedRevenue ?? 0;
        const actualCostDollars = opportunity.actualCostDollars ?? 0;
        acc.totalActualDollars += actualDollars;
        acc.totalActualCostDollars += actualCostDollars;
        return acc;
      },
      { totalActualDollars: 0, totalActualCostDollars: 0 },
    );

    let actualGrossMarginPercent = 0;
    if (actualGrossMargin.totalActualDollars > 0) {
      actualGrossMarginPercent =
        ((actualGrossMargin.totalActualDollars -
          actualGrossMargin.totalActualCostDollars) /
          actualGrossMargin.totalActualDollars) *
        100;
    }

    return actualGrossMarginPercent;
  }
}
