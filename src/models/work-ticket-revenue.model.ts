import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class WorkTicketRevenue extends Model {
  public companyId!: number;
  public workTicketRevenueId!: number;
  public revenueMonth!: string | null;
  public revenueAmount!: number | null;
  public createdDateTime!: Date | null;
  public accountingPeriodName!: string | null;
  public accountingPeriodYear!: number | null;
  public accountingPeriodId!: number | null;
}

WorkTicketRevenue.init(
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
    workTicketRevenueId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    revenueMonth: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    revenueAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    createdDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    accountingPeriodName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accountingPeriodYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    accountingPeriodId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'WorkTicketRevenue',
    tableName: 'work_ticket_revenues',
    timestamps: false,
  },
);

export default WorkTicketRevenue;
