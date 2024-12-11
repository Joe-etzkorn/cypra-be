import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class OpportunityServiceRoute extends Model {
  public companyId!: number;
  public opportunityServiceId!: number;
  public routeId!: number | null;
  public routeName!: string | null;
}

OpportunityServiceRoute.init(
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
    routeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
    },
    routeName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'OpportunityServiceRoute',
    tableName: 'opportunity_service_routes',
    timestamps: false,
  },
);

export default OpportunityServiceRoute;
