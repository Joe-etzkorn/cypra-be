import { CognitoUser } from '../interfaces/user.interface';
import { Op } from 'sequelize';
import WorkTicket from '../models/work-ticket.model';
import WorkTicketTime from '../models/work-ticket-time.model';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../utils/common';
import db from '../utils/db';

export class OperationsDashboardService {
  async getDashboardData(cognitoUser: CognitoUser, _filter: any): Promise<any> {
    try {
      const response = await this.calculate(cognitoUser.companyId);
      return response;
    } catch (error) {
      console.error('Error getting operations dashboard:', error);
      throw error;
    }
  }
  private async calculate(userId: number) {
    const workTickets = await WorkTicket.findAll({
      where: {
        companyId: userId,
        workTicketStatus: 'Complete',
      },
    });

    const total = workTickets.reduce(
      (acc, workTicket) => acc + (workTicket.earnedRevenue ?? 0),
      0,
    );
    const grossProfit = workTickets.reduce((acc, workTicket) => {
      const grossProfit =
        (workTicket.earnedRevenue ?? 0) - (workTicket.totalCostAct ?? 0);
      return acc + grossProfit;
    }, 0);
    const grossMargin = (grossProfit / total) * 100;

    const hoursVariancePercent =
      workTickets.reduce((acc, workTicket) => {
        if (!workTicket.hoursEst || !workTicket.hoursAct) return acc;
        const hoursVariance =
          ((workTicket.hoursEst - workTicket.hoursAct) / workTicket.hoursEst) *
          100;
        return acc + hoursVariance;
      }, 0) / workTickets.length;

    const laborRateVariance =
      workTickets.reduce((acc, workTicket) => {
        if (!workTicket.laborCostAct || !workTicket.hoursAct) return acc;
        const actualLaborRate = workTicket.laborCostAct / workTicket.hoursAct;
        return acc + actualLaborRate;
      }, 0) / workTickets.length;

    return {
      common: {
        total,
      },
      grossProfit: {
        total: grossProfit,
      },
      grossMargin: {
        count: grossMargin,
      },
      hoursVariance: {
        count: hoursVariancePercent,
      },
      laborRateVariance: {
        total: laborRateVariance,
      },
      earnedRevenueChart: await this.getEarnedRevenueChart(workTickets),
      operationsBacklog: await this.getOperationBacklog(),
    };
  }

  private async getEarnedRevenueChart(workTickets: WorkTicket[]) {
    const monthlyRevenue = new Array(12).fill(0);
    const monthlyGrossProfit = new Array(12).fill(0);
    const monthlyGrossMargin = new Array(12).fill(0);

    workTickets.forEach((workTicket) => {
      if (workTicket.completeDate) {
        const monthIndex = new Date(workTicket.completeDate).getMonth();
        monthlyRevenue[monthIndex] += workTicket.earnedRevenue ?? 0;
      }
    });
    for (let i = 0; i < 12; i++) {
      const monthlyWorkTickets = workTickets.filter((workTicket) => {
        if (workTicket.completeDate) {
          return new Date(workTicket.completeDate).getMonth() === i;
        }
        return false;
      });

      const grossProfit = monthlyWorkTickets.reduce((acc, workTicket) => {
        const grossProfit =
          (workTicket.earnedRevenue ?? 0) - (workTicket.totalCostAct ?? 0);
        return acc + grossProfit;
      }, 0);
      const price = monthlyWorkTickets.reduce((acc, workTicket) => {
        const price = workTicket.price ?? 0;
        return acc + price;
      }, 0);
      const grossMargin = (grossProfit / price) * 100;

      monthlyGrossProfit[i] = grossProfit;
      monthlyGrossMargin[i] = grossMargin;
    }

    return {
      monthlyRevenue,
      monthlyGrossProfit,
      monthlyGrossMargin,
    };
  }

  private async getOperationBacklog() {
    const openAndScheduledWorkTickets = await WorkTicket.findAll({
      where: {
        workTicketStatus: {
          [Op.in]: ['Open', 'Scheduled'],
        },
      },
    });

    const totalRevenueBacklog = openAndScheduledWorkTickets.reduce(
      (acc, workTicket) => {
        return acc + (workTicket.earnedRevenue ?? 0);
      },
      0,
    );

    const totalHoursBacklog = openAndScheduledWorkTickets.reduce(
      (acc, workTicket) => {
        return acc + (workTicket.hoursEst ?? 0);
      },
      0,
    );

    const totalRunway = openAndScheduledWorkTickets.reduce(
      (acc, workTicket) => {
        const hoursScheduled = workTicket.hoursScheduled ?? 0;
        const hoursPerDay = 8;
        const daysRemaining = hoursScheduled / hoursPerDay;
        return acc + daysRemaining;
      },
      0,
    );

    return {
      totalRevenueBacklog,
      totalHoursBacklog,
      totalRunway,
    };
  }

  async getCrewReportsTable(
    cognitoUser: CognitoUser,
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_LIMIT,
  ): Promise<any> {
    try {
      const workTicketsTotal = await db.query(`
        SELECT 
          count(*)
        FROM 
          work_tickets wt
        WHERE wt."companyId" = ${cognitoUser.companyId}
        GROUP BY 
          wt."crewLeaderContactName", wt."companyId"
      `);
      const total = workTicketsTotal[0].length;

      const workTickets = await db.query(`
        SELECT 
          wt."companyId",
          wt."crewLeaderContactName",
          SUM(wt."earnedRevenue") AS "earnedRevenue",
          AVG(CASE WHEN wt."hoursEst" > 0 THEN wt."hoursAct" / wt."hoursEst" ELSE 0 END) * 100 AS "laborEfficiency",
          AVG(CASE WHEN wt."price" > 0 THEN (wt."price" - (wt."hourCostEst" + wt."materialCostEst" + wt."equipCostEst" + wt."otherCostEst" + wt."subCostEst")) / wt."price" ELSE 0 END) * 100 AS "estimatedGMPercent",
          AVG(CASE WHEN wt."earnedRevenue" > 0 THEN (wt."earnedRevenue" - wt."totalCostAct") / wt."earnedRevenue" ELSE 0 END) * 100 AS "actualGMPercent"
        FROM 
          work_tickets wt
        WHERE wt."companyId" = ${cognitoUser.companyId}
        GROUP BY 
          wt."crewLeaderContactName", wt."companyId"
		    ORDER BY SUM(wt."earnedRevenue") DESC
        LIMIT ${limit}
        OFFSET ${(page - 1) * limit}
      `);

      return {
        table: workTickets[0],
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total: total,
      };
    } catch (error) {
      console.error('Error getting crew reports:', error);
      throw error;
    }
  }
  async getTopServicesReportTable(
    cognitoUser: CognitoUser,
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_LIMIT,
  ): Promise<any> {
    try {
      const workTicketTimesTotal = await db.query(`
        SELECT 
          count(*)
        FROM 
          work_ticket_times wtt
        INNER JOIN 
          work_tickets wt ON wtt."workTicketId" = wt."workTicketId" AND wtt."companyId" = wt."companyId"
        INNER JOIN 
          opportunity_services os ON wt."opportunityServiceId" = os."opportunityServiceId"
        WHERE wtt."companyId" = ${cognitoUser.companyId}
        GROUP BY 
          os."displayName", wtt."companyId"
      `);
      const total = workTicketTimesTotal[0].length;
  
      const workTicketTimes = await db.query(`
        SELECT 
          wtt."companyId",
          os."displayName" as "serviceName",
          SUM(wt."earnedRevenue") AS "earnedRevenue",
          SUM(wt."earnedRevenue" - wt."totalCostAct") AS "grossProfit",
          AVG(CASE WHEN wt."hoursEst" > 0 THEN wt."hoursAct" / wt."hoursEst" ELSE 0 END) * 100 AS "laborEfficiency",
          AVG(CASE WHEN wt."price" > 0 THEN (wt."price" - (wt."hourCostEst" + wt."materialCostEst" + wt."equipCostEst" + wt."otherCostEst" + wt."subCostEst")) / wt."price" ELSE 0 END) * 100 AS "estimatedGMPercent",
          AVG(CASE WHEN wt."earnedRevenue" > 0 THEN (wt."earnedRevenue" - wt."totalCostAct") / wt."earnedRevenue" ELSE 0 END) * 100 AS "actualGMPercent"
        FROM 
          work_ticket_times wtt
        INNER JOIN 
          work_tickets wt ON wtt."workTicketId" = wt."workTicketId" AND wtt."companyId" = wt."companyId"
        INNER JOIN 
          opportunity_services os ON wt."opportunityServiceId" = os."opportunityServiceId"
        WHERE wtt."companyId" = ${cognitoUser.companyId}
        GROUP BY 
          os."displayName", wtt."companyId"
        ORDER BY SUM(wt."earnedRevenue") DESC
        LIMIT ${limit}
        OFFSET ${(page - 1) * limit}
      `);
  
      return {
        table: workTicketTimes[0],
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total: total,
      };
    } catch (error) {
      console.error('Error getting service reports:', error);
      throw error;
    }
  }

}
