import { Sequelize } from 'sequelize';
import Opportunity from '../models/opportunity.model';
import { CognitoUser } from '../interfaces/user.interface';
import User from '../models/user.model';

export class SalesDashboardService {
  async getDashboardData(cognitoUser: CognitoUser, _filter: any): Promise<any> {
    try {
      const response = await this.calculate(cognitoUser.companyId);
      return response;
    } catch (error) {
      console.error('Error getting sales dashboard:', error);
      throw error;
    }
  }
  private async calculate(userId: number) {
    const opportunities = await Opportunity.findAll({
      where: {
        companyId: userId,
      },
    });
    const wonOpportunities = opportunities.filter(
      (opportunity) => opportunity.opportunityStatusName === 'Won',
    );
    const totalOpportunities = wonOpportunities.reduce(
      (acc, opportunity) => acc + (opportunity.estimatedDollars ?? 0),
      0,
    );
    const deliveredOpportunities = opportunities.filter(
      (opportunity) => opportunity.opportunityStatusName === 'Delivered',
    );
    const totalDelivered = deliveredOpportunities.reduce(
      (total, opportunity) => total + (opportunity.estimatedDollars ?? 0),
      0,
    );

    const estimatedGrossMarginPercent = await
      this.calculateEstimatedGrossMarginByOpportunities(opportunities);

    return {
      sales: {
        total: totalOpportunities,
      },
      proposals: {
        count: deliveredOpportunities.length,
        total: totalDelivered,
      },
      closeRate: {
        count: (wonOpportunities.length / opportunities.length) * 100,
      },
      estimatedGrossMarin: {
        count: estimatedGrossMarginPercent,
      },
      salesWonChart: await this.salesWonChartData(
        wonOpportunities,
        opportunities.length,
      ),
      salesMixChart: await this.salesMixChartData(userId, opportunities),
      leaderboardTable: await this.leaderboardTable(
        wonOpportunities,
        opportunities.length,
      ),
      pipelineTable: await this.pipelineTable(opportunities),
    };
  }

  private async salesWonChartData(
    wonOpportunities: Opportunity[],
    totalOpportunities: number,
  ) {
    const monthlyRevenue = new Array(12).fill(0);
    const monthlyTotalWon = new Array(12).fill(0);
    const monthlyCloseRate = new Array(12).fill(0);

    wonOpportunities.forEach((opportunity) => {
      if (opportunity.wonDate) {
        const monthIndex = new Date(opportunity.wonDate).getMonth();
        monthlyRevenue[monthIndex] += opportunity.actualEarnedRevenue ?? 0;
        monthlyTotalWon[monthIndex] += 1;
      }
    });
    for (let i = 0; i < 12; i++) {
      const monthlyOpportunities = wonOpportunities.filter((op) => {
        if (op.wonDate) {
          return new Date(op.wonDate).getMonth() === i;
        }
        return false;
      });

      const estimatedGrossMarginPercent =
        (monthlyOpportunities.length / totalOpportunities) * 100;

      monthlyCloseRate[i] = estimatedGrossMarginPercent;
    }

    return {
      monthlyRevenue,
      monthlyTotalWon,
      monthlyCloseRate,
    };
  }

  private async salesMixChartData(
    userId: number,
    opportunities: Opportunity[],
  ) {
    const totalRevenue = opportunities.reduce(
      (acc, opportunity) => acc + (opportunity.estimatedDollars ?? 0),
      0,
    );
    const salesMix = await Opportunity.findAll({
      where: {
        companyId: userId,
      },
      attributes: [
        'divisionName',
        [
          Sequelize.fn('SUM', Sequelize.col('"estimatedDollars"')),
          'totalRevenue',
        ],
        [
          Sequelize.literal(
            'SUM("estimatedDollars") / ' + totalRevenue + ' * 100',
          ),
          'salesMixPercentage',
        ],
      ],
      group: ['divisionName'],
    });
    return {
      salesMix: salesMix,
    };
  }

  private async leaderboardTable(
    wonOpportunities: Opportunity[],
    totalOpportunities: number,
  ) {
    const salesRepData: Record<
      string,
      {
        name: string;
        branch: string;
        opportunities: number;
        salesWon: number;
      }
    > = {};

    for (const opportunity of wonOpportunities) {
      const { salesRepContactName, branchName, actualEarnedRevenue } =
        opportunity;

      if (!salesRepContactName || !branchName) continue;

      const key = `${salesRepContactName}-${branchName}`;

      if (!salesRepData[key]) {
        salesRepData[key] = {
          name: salesRepContactName,
          branch: branchName,
          opportunities: 0,
          salesWon: 0,
        };
      }

      salesRepData[key].opportunities += 1;
      salesRepData[key].salesWon += actualEarnedRevenue ?? 0;
    }

    const leaderboard = Object.values(salesRepData).map((data) => {
      const closeRate = (
        (data.opportunities / totalOpportunities) *
        100
      ).toFixed(2);

      return {
        key: `${data.name}-${data.branch}`,
        name: data.name,
        branch: data.branch,
        opportunities: data.opportunities,
        salesWon: data.salesWon.toFixed(2),
        closeRate,
      };
    });

    return leaderboard;
  }
  private async pipelineTable(opportunities: Opportunity[]) {
    const pipelineData: Record<
      string,
      {
        stage: string;
        estimateCost: number;
        estimatedHours: number;
        opportunities: number;
      }
    > = {};

    for (const opportunity of opportunities) {
      const {
        opportunityStatusName,
        estimatedCostDollars,
        estimatedLaborHours,
      } = opportunity;

      if (!opportunityStatusName) continue;

      if (!pipelineData[opportunityStatusName]) {
        pipelineData[opportunityStatusName] = {
          stage: opportunityStatusName,
          estimateCost: 0,
          estimatedHours: 0,
          opportunities: 0,
        };
      }

      pipelineData[opportunityStatusName].estimateCost +=
        estimatedCostDollars ?? 0;
      pipelineData[opportunityStatusName].estimatedHours +=
        estimatedLaborHours ?? 0;
      pipelineData[opportunityStatusName].opportunities += 1;
    }

    const pipeline = Object.values(pipelineData).map((data) => {
      return {
        key: data.stage,
        stage: data.stage,
        estimateCost: data.estimateCost.toFixed(2),
        estimatedHours: data.estimatedHours,
        opportunities: data.opportunities,
      };
    });

    return pipeline;
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
