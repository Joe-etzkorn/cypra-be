import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';
import User from './user.model';

class Opportunity extends Model {
  public companyId!: number;
  public opportunityId!: number;
  public propertyId?: number;
  public opportunityStatusId?: number;
  public opportunityStatusName?: string;
  public salesRepContactId?: number;
  public salesRepContactName?: string;
  public operationsManagerContactId?: number;
  public operationsManagerContactName?: string;
  public divisionId?: number;
  public divisionName?: string;
  public branchId?: number;
  public branchName?: string;
  public salesTypeName?: string;
  public leadSourceName?: string;
  public masterOpportunityId?: number;
  public opportunityType?: string;
  public startDate?: Date;
  public endDate?: Date;
  public approvedDate?: Date;
  public proposedDate?: Date;
  public wonDate?: Date;
  public lostDate?: Date;
  public probability?: number;
  public anticipatedCloseDate?: Date;
  public invoiceType?: string;
  public estimatedDollars?: number;
  public createdByUserName?: string;
  public createdByUserId?: number;
  public approvedUserId?: number;
  public approvedUserName?: string;
  public closedUserId?: number;
  public closedUserName?: string;
  public competitorName?: string;
  public lostReason?: string;
  public opportunityNumber?: string;
  public estimatedCostDollars?: number;
  public estimatedOverheadDollars?: number;
  public estimatedBreakEvenDollars?: number;
  public estimatedNetProfitPercent?: number;
  public estimatedGrossMarginPercent?: number;
  public estimatedGrossMarginDollars?: number;
  public estimatedLaborHours?: number;
  public estimatedLaborCostPerHour?: number;
  public estimatedRealizeRate?: number;
  public estimatedEquipmentCost?: number;
  public estimatedLaborCost?: number;
  public estimatedMaterialCost?: number;
  public estimatedOtherCost?: number;
  public estimatedSubCost?: number;
  public actualCostDollars?: number;
  public actualGrossMarginPercent?: number;
  public actualGrossMarginDollars?: number;
  public actualLaborHours?: number;
  public actualLaborCostPerHour?: number;
  public actualEarnedRevenue?: number;
  public percentComplete?: number;
  public renewalDate?: Date;
  public modifiedDate?: Date;
  public jobStatusName?: string;
  public propertyName?: string;
  public actualCostSub?: number;
  public actualCostMaterial?: number;
  public actualCostLabor?: number;
  public completeDate?: Date;
  public opportunityStageId?: number;
  public opportunityStageName?: string;
  public opportunityStage?: string;
  public opportunityStatus?: string;
}

Opportunity.init(
  {
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    opportunityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    opportunityStatusId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    opportunityStatusName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    salesRepContactId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    salesRepContactName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    operationsManagerContactId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    operationsManagerContactName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    divisionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    divisionName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    branchName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    salesTypeName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    leadSourceName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    masterOpportunityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    opportunityType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    approvedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    proposedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    wonDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lostDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    probability: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    anticipatedCloseDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    invoiceType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estimatedDollars: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    createdByUserName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdByUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    approvedUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    approvedUserName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    closedUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    closedUserName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    competitorName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lostReason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    opportunityNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estimatedCostDollars: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    estimatedOverheadDollars: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    estimatedBreakEvenDollars: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    estimatedNetProfitPercent: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    estimatedGrossMarginPercent: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    estimatedGrossMarginDollars: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    estimatedLaborHours: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    estimatedLaborCostPerHour: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    estimatedRealizeRate: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    estimatedEquipmentCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    estimatedLaborCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    estimatedMaterialCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    estimatedOtherCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    estimatedSubCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    actualCostDollars: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    actualGrossMarginPercent: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    actualGrossMarginDollars: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    actualLaborHours: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    actualLaborCostPerHour: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    actualEarnedRevenue: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    percentComplete: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    renewalDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    modifiedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    jobStatusName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    propertyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    actualCostSub: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    actualCostMaterial: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    actualCostLabor: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    completeDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    opportunityStageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    opportunityStageName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    opportunityStage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    opportunityStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Opportunity',
    tableName: 'opportunities',
    timestamps: false,
  }
);

export default Opportunity;
