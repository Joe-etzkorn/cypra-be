import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class OpportunityServiceDefaultPayCode extends Model {
  public companyId!: number;
  public opportunityServiceId!: number;
  public opportunityServiceDefaultPayCodeId!: number;
  public payCodeId?: number;
  public payScheduleId?: number;
}

OpportunityServiceDefaultPayCode.init(
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
    opportunityServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    opportunityServiceDefaultPayCodeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    payCodeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    payScheduleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'OpportunityServiceDefaultPayCode',
    tableName: 'opportunity_service_default_pay_codes',
    timestamps: false,
  },
);

export default OpportunityServiceDefaultPayCode;
