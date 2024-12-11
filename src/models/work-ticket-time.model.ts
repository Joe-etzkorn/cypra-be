import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class WorkTicketTime extends Model {
  public companyId!: number;
  public workTicketTimeId!: number;
  public workTicketId!: number | null;
  public workTicketNumber!: string | null;
  public contactId!: number | null;
  public contactName!: string | null;
  public workTicketTimeDate!: Date | null;
  public startTime!: Date | null;
  public endTime!: Date | null;
  public opportunityServiceLaborRate!: number | null;
  public hours!: number | null;
  public othours!: number | null;
  public warrantyTime!: number | null;
  public distributedTime!: number | null;
  public burdenedCost!: number | null;
  public invoiceId!: number | null;
  public invoiceNumber!: string | null;
  public createdDateTime!: Date | null;
  public lastModifiedDateTime!: Date | null;
  public approvedDateTime!: Date | null;
  public acceptedDateTime!: Date | null;
  public breakTime!: number | null;
  public baseHourlyRate!: number | null;
  public routeId!: number | null;
  public routeName!: string | null;
  public crewLeaderContactId!: number | null;
  public crewLeaderContactName!: string | null;
  public branchId!: number | null;
  public branchName!: string | null;
}

WorkTicketTime.init(
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
    workTicketTimeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    workTicketId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    workTicketNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    workTicketTimeDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    opportunityServiceLaborRate: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    hours: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    othours: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    warrantyTime: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    distributedTime: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    burdenedCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    invoiceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    invoiceNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lastModifiedDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    approvedDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    acceptedDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    breakTime: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    baseHourlyRate: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    routeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    routeName: {
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
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    branchName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'WorkTicketTime',
    tableName: 'work_ticket_times',
    timestamps: false,
  },
);

export default WorkTicketTime;
