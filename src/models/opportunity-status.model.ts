import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class OpportunityStatus extends Model {
  public companyId!: number;
  public opportunityStatusId!: number;
  public opportunityStatusName!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

OpportunityStatus.init(
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
    opportunityStatusId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    opportunityStatusName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'createdAt',
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updatedAt',
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'OpportunityStatus',
    tableName: 'opportunity_statuses',
  },
);

export default OpportunityStatus;
