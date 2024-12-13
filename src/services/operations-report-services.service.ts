import Opportunity from '../models/opportunity.model';
import { CognitoUser } from '../interfaces/user.interface';
import { groupBy } from 'lodash';
import OpportunityService from '../models/opportunity-service.model';
import Service from '../models/service.model';
import { Op } from 'sequelize';

interface OpportunityType {
  opportunityId: number;
  propertyName: string;
  actualEarnedRevenue: number | null;
  estimatedLaborHours: number | null;
  actualLaborHours: number | null;
  estimatedCostDollars: number | null;
  actualCostDollars: number | null;
  opportunityServices?: OpportunityServiceType[];
}

type GroupedProperties = {
  [propertyName: string]: OpportunityType[];
};

type GroupedByServiceName = {
  [serviceName: string]: GroupedProperties;
};
interface OpportunityServiceType {
  opportunityServiceId: number;
  displayName: string | null;
  serviceId: number | null;
  opportunityId: number | null;
}

type ServicesReportDataType = {
  key: string;
  serviceName: string;
  earnedRevenue: number;
  estimatedHours: number;
  hours: number;
  laborVariance: number;
  grossProfit: number;
  estimatedGrossMargin: number;
  grossMargin: number;
  percentVariance: number;
  children?: ServicesReportDataType[];
};
export class OperationsReportServicesService {
  async getReportServices(cognitoUser: CognitoUser): Promise<any> {
    try {
      // Fetch won opportunities
      const opportunities: Opportunity[] = await Opportunity.findAll({
        where: {
          companyId: cognitoUser.companyId,
          opportunityStatusName: 'Won',
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

      // Fetch opportunity services
      const opportunityServices: OpportunityServiceType[] =
        await OpportunityService.findAll({
          where: {
            opportunityId: {
              [Op.in]: opportunities.map((o) => o.opportunityId),
            },
          },
          attributes: [
            'opportunityServiceId',
            'displayName',
            'serviceId',
            'opportunityId',
          ],
        });

      // Map relationships manually
      const wonOpportunities: OpportunityType[] = opportunities.map(
        (opportunity: Opportunity) => {
          const relatedServices = opportunityServices
            .filter((os) => os.opportunityId === opportunity.opportunityId)

          return {
            ...opportunity.dataValues,
            opportunityServices: relatedServices,
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
      const groupedByServiceName: GroupedByServiceName =
        wonOpportunities.reduce(
          (result: GroupedByServiceName, opportunity: OpportunityType) => {
            const { opportunityServices } = opportunity;
            if (!opportunityServices) return result;

            opportunityServices.forEach(({ displayName }) => {
              if (!displayName) return;
              const serviceName = displayName;
              if (!serviceName) return;

              if (!result[serviceName]) result[serviceName] = {};

              if (!opportunity.propertyName) return;

              if (!result[serviceName][opportunity.propertyName]) {
                result[serviceName][opportunity.propertyName] = [];
              }

              result[serviceName][opportunity.propertyName].push({...opportunity, opportunityServices: undefined});
            });

            return result;
          },
          {},
        );

      // Transform to table format
      const tableData: ServicesReportDataType[] = Object.entries(
        groupedByServiceName,
      ).map(([serviceName, properties], serviceIndex) => {
        const children = Object.entries(properties).map(
          ([propertyName, opportunities], propertyIndex) => ({
            key: `${serviceIndex + 1}-${propertyIndex + 1}`,
            serviceName: propertyName,
            ...calculateMetrics(opportunities as OpportunityType[]),
          }),
        );

        return {
          key: (serviceIndex + 1).toString(),
          serviceName,
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
      console.error('Error getting operations dashboard:', error);
      throw error;
    }
  }
}
