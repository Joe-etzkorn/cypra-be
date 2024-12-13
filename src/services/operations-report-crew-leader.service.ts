import Opportunity from '../models/opportunity.model';
import { CognitoUser } from '../interfaces/user.interface';
import { groupBy } from 'lodash';
import OpportunityService from '../models/opportunity-service.model';
import Service from '../models/service.model';
import { Op, Sequelize } from 'sequelize';
import WorkTicket from '../models/work-ticket.model';
import db from '../utils/db';

interface OpportunityType {
  opportunityId: number;
  propertyName: string;
  actualEarnedRevenue: number | null;
  estimatedLaborHours: number | null;
  actualLaborHours: number | null;
  estimatedCostDollars: number | null;
  actualCostDollars: number | null;
  workTickets?: WorkTicketType[];
}
interface WorkTicketType {
  crewLeaderContactName?: string | null | undefined;
  workTicketId: number;
  opportunityId?: number | null | undefined;
}

type GroupedProperties = {
  [propertyName: string]: OpportunityType[];
};

type GroupedByCrewLeader = {
  [crewLeader: string]: GroupedProperties;
};

type CrewLeaderReportDataType = {
  key: string;
  crewLeader: string;
  earnedRevenue: number;
  estimatedHours: number;
  hours: number;
  laborVariance: number;
  grossProfit: number;
  estimatedGrossMargin: number;
  grossMargin: number;
  percentVariance: number;
  children?: CrewLeaderReportDataType[];
};
export class OperationsReportCrewLeaderService {
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
    const count = workTickets.length;
    const earnedRevenue = workTickets.reduce(
      (acc, workTicket) => acc + (workTicket.earnedRevenue ?? 0),
      0,
    );
    const laborEfficiency =
      workTickets.reduce((acc, workTicket) => {
        const hoursAct = workTicket.hoursAct ?? 0;
        const hoursEst = workTicket.hoursEst ?? 0;
        if (hoursEst > 0) {
          return acc + hoursAct / hoursEst;
        }
        return acc;
      }, 0) / count;
    const grossMargin =
      workTickets.reduce((acc, workTicket) => {
        const price = workTicket.price ?? 0;
        const hourCostEst = workTicket.hourCostEst ?? 0;
        const materialCostEst = workTicket.materialCostEst ?? 0;
        const equipCostEst = workTicket.equipCostEst ?? 0;
        const otherCostEst = workTicket.otherCostEst ?? 0;
        const subCostEst = workTicket.subCostEst ?? 0;
        const totalCostEst =
          hourCostEst +
          materialCostEst +
          equipCostEst +
          otherCostEst +
          subCostEst;
        if (price > 0) {
          return acc + (price - totalCostEst) / price;
        }
        return acc;
      }, 0) / count;
    const hoursVariancePercent =
      workTickets.reduce((acc, workTicket) => {
        const hoursAct = workTicket.hoursAct ?? 0;
        const hoursEst = workTicket.hoursEst ?? 0;
        if (hoursEst > 0) {
          return acc + (hoursAct - hoursEst) / hoursEst;
        }
        return acc;
      }, 0) / count;

    return {
      common: {
        count: laborEfficiency * 100,
      },
      earnedRevenue: {
        total: earnedRevenue,
      },
      grossMargin: {
        count: grossMargin * 100,
      },
      hoursVariance: {
        count: hoursVariancePercent * 100,
      },
    };
  }

  async getCrewLeaderTable(cognitoUser: CognitoUser): Promise<any> {
    try {
      const opportunities: Opportunity[] = await Opportunity.findAll({
        where: {
          companyId: cognitoUser.companyId,
        },
        attributes: [
          'opportunityId',
          'propertyName',
          'actualEarnedRevenue',
          'estimatedLaborHours',
          'actualLaborHours',
          'estimatedCostDollars',
          'actualCostDollars',
        ],
      });

      const workTickets: WorkTicketType[] = await WorkTicket.findAll({
        where: {
          opportunityId: {
            [Op.in]: opportunities.map((o) => o.opportunityId),
          },
        },
        attributes: ['crewLeaderContactName', 'workTicketId', 'opportunityId'],
      });

      // Map relationships manually
      const wonOpportunities: OpportunityType[] = opportunities.map(
        (opportunity: Opportunity) => {
          const relatedWorkTickets = workTickets.filter(
            (os) => os.opportunityId === opportunity.opportunityId,
          );

          return {
            ...opportunity.dataValues,
            workTickets: relatedWorkTickets,
          };
        },
      );

      // Helper function to calculate metrics for a group
      const calculateMetrics = (items: OpportunityType[]) => {
        const earnedRevenue = items.reduce(
          (sum: number, item: OpportunityType) =>
            sum + (item.actualEarnedRevenue ?? 0),
          0,
        );
        const estimatedHours = items.reduce(
          (sum: number, item: OpportunityType) =>
            sum + (item.estimatedLaborHours ?? 0),
          0,
        );
        const actualHours = items.reduce(
          (sum: number, item: OpportunityType) =>
            sum + (item.actualLaborHours ?? 0),
          0,
        );
        const estimatedCosts = items.reduce(
          (sum: number, item: any) => sum + (item.estimatedCostDollars ?? 0),
          0,
        );
        const actualCosts = items.reduce(
          (sum: number, item: any) => sum + (item.actualCostDollars ?? 0),
          0,
        );
        const grossProfit = earnedRevenue - actualCosts;
        const estimatedGrossMargin =
          earnedRevenue > 0
            ? ((earnedRevenue - estimatedCosts) / earnedRevenue) * 100
            : 0;
        const grossMargin =
          earnedRevenue > 0 ? (grossProfit / earnedRevenue) * 100 : 0;
        const laborVariance = estimatedHours - actualHours;
        const percentVariance =
          estimatedHours > 0 ? (laborVariance / estimatedHours) * 100 : 0;

        return {
          earnedRevenue: earnedRevenue,
          estimatedHours: estimatedHours,
          hours: actualHours,
          laborVariance: laborVariance,
          grossProfit: grossProfit,
          estimatedGrossMargin: estimatedGrossMargin,
          grossMargin: grossMargin,
          percentVariance: percentVariance,
        };
      };
      const groupedByServiceName: GroupedByCrewLeader = wonOpportunities.reduce(
        (result: GroupedByCrewLeader, opportunity: OpportunityType) => {
          const { workTickets } = opportunity;
          if (!workTickets) return result;

          workTickets.forEach(({ crewLeaderContactName }) => {
            const crewLeader = crewLeaderContactName;
            if (!crewLeader) return;

            if (!result[crewLeader]) result[crewLeader] = {};

            if (!opportunity.propertyName) return;

            if (!result[crewLeader][opportunity.propertyName]) {
              result[crewLeader][opportunity.propertyName] = [];
            }

            result[crewLeader][opportunity.propertyName].push({
              ...opportunity,
              workTickets: undefined,
            });
          });

          return result;
        },
        {},
      );

      // Transform to table format
      const tableData: CrewLeaderReportDataType[] = Object.entries(
        groupedByServiceName,
      ).map(([crewLeader, properties], serviceIndex) => {
        const children = Object.entries(properties).map(
          ([propertyName, opportunities], propertyIndex) => ({
            key: `${serviceIndex + 1}-${propertyIndex + 1}`,
            crewLeader: propertyName,
            ...calculateMetrics(opportunities as OpportunityType[]),
          }),
        );

        return {
          key: (serviceIndex + 1).toString(),
          crewLeader,
          ...calculateMetrics(
            Object.values(properties).flat() as OpportunityType[],
          ),
          children,
        };
      });

      return {
        table: tableData,
      };
    } catch (error) {
      console.error('Error getting crew leader report dashboard:', error);
      throw error;
    }
  }

  async getChartLaborEfficiencyAndWarrantyHours(
    cognitoUser: CognitoUser,
    _filter: any,
  ): Promise<any> {
    try {
      const query = `
        SELECT 
          "crewLeaderContactName",
          SUM(CASE WHEN "hoursEst" > 0 THEN "hoursAct" / "hoursEst" ELSE 0 END) / COUNT(*) * 100 AS "laborEfficiency",
          SUM("warrantyHoursAct") AS "warrantyHoursAvg"
        FROM 
          work_tickets
        WHERE 
          "companyId" = ${cognitoUser.companyId} AND
          "workTicketStatus" = 'Complete'
        GROUP BY 
          "crewLeaderContactName"
      `;
      const workTickets = await db.query(query);

      return {
        chart: workTickets[0]
      };
    } catch (error) {
      console.error('Error getting crew leader report dashboard:', error);
      throw error;
    }
  }
  
  async getChartLaborEfficiencyAndEarnedRevenue(
    cognitoUser: CognitoUser,
    _filter: any,
  ): Promise<any> {
    try {
      const query = `
        SELECT 
          "crewLeaderContactName",
          SUM(CASE WHEN "hoursEst" > 0 THEN "hoursAct" / "hoursEst" ELSE 0 END) / COUNT(*) * 100 AS "laborEfficiency",
          SUM("earnedRevenue") AS "earnedRevenue"
        FROM 
          work_tickets
        WHERE 
          "companyId" = ${cognitoUser.companyId} AND
          "workTicketStatus" = 'Complete'
        GROUP BY 
          "crewLeaderContactName"
      `;
      const workTickets = await db.query(query);

      return {
        chart: workTickets[0]
      };
    } catch (error) {
      console.error('Error getting crew leader report dashboard:', error);
      throw error;
    }
  }
}
