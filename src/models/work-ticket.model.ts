import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class WorkTicket extends Model {
  public companyId!: number;
  public workTicketId!: number;
  public opportunityServiceId?: number;
  public contractYear?: number;
  public occur?: number;
  public annualizedOccur?: number;
  public createdDateTime?: Date;
  public anticStartDate?: Date;
  public scheduledStartDate?: Date | null;
  public completeDate?: Date | null;
  public approvedDate?: Date | null;
  public workTicketStatusId?: number | null;
  public workTicketStatusName?: string | null;
  public crewLeaderContactId?: number | null;
  public crewLeaderContactName?: string | null;
  public hoursEst?: number | null;
  public hourCostEst?: number | null;
  public materialCostEst?: number | null;
  public equipCostEst?: number | null;
  public subCostEst?: number | null;
  public otherCostEst?: number | null;
  public price?: number | null;
  public tmCalcAmount?: number | null;
  public tmOverrideAmount?: number | null;
  public invoicedAmount?: number | null;
  public workTicketNumber?: string | null;
  public hoursAct?: number | null;
  public warrantyHoursAct?: number | null;
  public laborCostAct?: number | null;
  public materialCostAct?: number | null;
  public equipmentCostAct?: number | null;
  public subCostAct?: number | null;
  public otherCostAct?: number | null;
  public totalCostAct?: number | null;
  public earnedRevenue?: number | null;
  public realizeRateRevenue?: number | null;
  public opportunityId?: number | null;
  public opportunityNumber?: string | null;
  public estRealizeRateRevenue?: number | null;
  public distributedHours?: number | null;
  public partialOccurence?: boolean | null;
  public branchName?: string | null;
  public lastModifiedDateTime?: Date | null;
  public workTicketStatus?: string | null;
  public hoursScheduled?: number | null;
  public hoursUnscheduled?: number | null;
  public reviewedDateTime?: Date | null;
  public reviewedUserId?: number | null;
  public reviewedUserName?: string | null;
  public propertyId?: number;
}

WorkTicket.init(
  {
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    workTicketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    opportunityServiceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    contractYear: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    occur: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    annualizedOccur: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    createdDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    anticStartDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    scheduledStartDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completeDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    approvedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    workTicketStatusId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    workTicketStatusName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    crewLeaderContactId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    crewLeaderContactName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hoursEst: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    hourCostEst: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    materialCostEst: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    equipCostEst: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    subCostEst: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    otherCostEst: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    tmCalcAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    tmOverrideAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    invoicedAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    workTicketNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hoursAct: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    warrantyHoursAct: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    laborCostAct: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    materialCostAct: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    equipmentCostAct: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    subCostAct: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    otherCostAct: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    totalCostAct: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    earnedRevenue: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    realizeRateRevenue: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    opportunityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    opportunityNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estRealizeRateRevenue: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    distributedHours: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    partialOccurence: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    branchName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastModifiedDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    workTicketStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hoursScheduled: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    hoursUnscheduled: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    reviewedDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    reviewedUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reviewedUserName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'WorkTicket',
    tableName: 'work_tickets',
    timestamps: false,
  },
);

export default WorkTicket;
