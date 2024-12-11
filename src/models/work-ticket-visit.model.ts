import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class WorkTicketVisit extends Model {
  public companyId!: number;
  public workTicketVisitId!: number;
  public routeId!: number | null;
  public scheduledDate!: Date | null;
  public sequenceNum!: number | null;
  public workTicketId!: number | null;
  public hours!: number | null;
  public routeName!: string | null;
  public workTicketNumber!: string | null;
}

WorkTicketVisit.init(
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
    workTicketVisitId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    routeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    scheduledDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    sequenceNum: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    workTicketId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hours: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    routeName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    workTicketNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'WorkTicketVisit',
    tableName: 'work_ticket_visits',
    timestamps: false,
  },
);

export default WorkTicketVisit;
