import { CognitoUser } from '../interfaces/user.interface';
import Opportunity from '../models/opportunity.model';
import User from '../models/user.model';

type Summary = {
  key: number;
  property: string;
  division: string;
  name: string;
  estHrs: number;
  estProfit: number;
};

type DivisionSummary = {
  divisionName: string;
  estimatedDollars: string;
};

export class SalesReportPipelineService {
  async getReport(cognitoUser: CognitoUser, _filters: any): Promise<any> {
    try {
      const user = await User.findOne({
        where: {
          userCognitoId: cognitoUser.sub,
        },
      });

      if (!user) {
        return null;
      }
      return await this.calculate(user.id);
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

    const grouped = this.groupOpportunities(opportunities);
    const [
      mostDivision,
      averageSalesCycle,
      biddingTable,
      deliveredTable,
      wonLost,
    ] = await Promise.all([
      this.mostDivision(grouped.bidding.concat(grouped.delivered)),
      this.calculateCycleFromDeliveryToApproval(grouped.delivered),
      this.getSummaryByBiddingOrDelivery(grouped.bidding),
      this.getSummaryByBiddingOrDelivery(grouped.delivered),
      this.getSummaryWonLost(grouped.wonLost),
    ]);

    return {
      common: {
        count: grouped.bidding.length + grouped.delivered.length,
        total:
          this.calculateTotal(grouped.bidding) +
          this.calculateTotal(grouped.delivered),
      },
      bidding: { count: grouped.bidding.length },
      delivered: { count: grouped.delivered.length },
      mostDivision,
      averageSalesCycle: { count: averageSalesCycle },
      biddingTable,
      deliveredTable,
      wonLost,
    };
  }

  private groupOpportunities(opportunities: Opportunity[]) {
    return {
      bidding: opportunities.filter(
        (o) => o.opportunityStatusName === 'Bidding',
      ),
      delivered: opportunities.filter(
        (o) => o.opportunityStatusName === 'Delivered',
      ),
      wonLost: opportunities.filter((o) =>
        ['Won', 'Lost'].includes(o.opportunityStatusName || ''),
      ),
    };
  }

  private calculateTotal(opportunities: Opportunity[]) {
    return opportunities.reduce((acc, o) => acc + (o.estimatedDollars ?? 0), 0);
  }

  private async mostDivision(
    opportunities: Opportunity[],
  ): Promise<DivisionSummary> {
    const divisionData: Record<
      string,
      DivisionSummary & { opportunities: number }
    > = {};

    for (const { divisionName, estimatedDollars } of opportunities) {
      if (!divisionName) continue;

      if (!divisionData[divisionName]) {
        divisionData[divisionName] = {
          divisionName,
          estimatedDollars: '0',
          opportunities: 0,
        };
      }

      const division = divisionData[divisionName];
      division.opportunities++;
      division.estimatedDollars = (
        parseFloat(division.estimatedDollars) + (estimatedDollars ?? 0)
      ).toFixed(2);
    }

    return Object.values(divisionData).sort(
      (a, b) => b.opportunities - a.opportunities,
    )[0];
  }

  private async calculateCycleFromDeliveryToApproval(
    opportunities: Opportunity[],
  ): Promise<number> {
    const cycleDays = opportunities
      .filter((o) => o.startDate && o.approvedDate)
      .map(({ startDate, approvedDate }) => {
        const start = new Date(startDate!).getTime();
        const approve = new Date(approvedDate!).getTime();
        return (approve - start) / (1000 * 3600 * 24);
      });

    if (cycleDays.length === 0) return 0;

    const totalCycleDays = cycleDays.reduce((sum, days) => sum + days, 0);
    return totalCycleDays / cycleDays.length;
  }

  private async getSummaryByBiddingOrDelivery(
    opportunities: Opportunity[],
  ): Promise<Summary[]> {
    return opportunities.map((o) => ({
      key: o.opportunityId,
      property: o.propertyName || 'Unknown',
      division: o.divisionName || 'Unknown',
      name: o.salesRepContactName || 'Unknown',
      estHrs: o.estimatedLaborHours || 0,
      estProfit: o.estimatedNetProfitPercent || 0,
    }));
  }

  private async getSummaryWonLost(opportunities: Opportunity[]) {
    let wonCount = 0;
    let lostCount = 0;

    const summary = opportunities.map((o) => {
      const isWon = !!o.wonDate;
      if (isWon) wonCount++;
      else lostCount++;

      return {
        key: o.opportunityId,
        status: isWon ? 'Won' : 'Lost',
        date: o.wonDate || o.lostDate || 'Unknown',
        property: o.propertyName || 'Unknown',
        division: o.divisionName || 'Unknown',
        name: o.salesRepContactName || 'Unknown',
        estHrs: o.estimatedLaborHours || 0,
        estProfit: o.estimatedNetProfitPercent || 0,
      };
    });

    const total = wonCount + lostCount;
    const wonPercentage = total > 0 ? (wonCount / total) * 100 : 0;
    const lostPercentage = total > 0 ? (lostCount / total) * 100 : 0;

    return {
      table: summary,
      chart: [wonPercentage, lostPercentage],
      total,
    };
  }
}
