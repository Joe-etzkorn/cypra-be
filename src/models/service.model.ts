import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class Service extends Model {
  public companyId!: number;
  public serviceId!: number;
  public serviceTypeName!: string | null;
  public serviceName!: string | null;
  public serviceNameAbr!: string | null;
  public displayName!: string | null;
  public active!: boolean;
}

Service.init(
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
    serviceId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    serviceTypeName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    serviceNameAbr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Service',
    tableName: 'services',
    timestamps: false,
  },
);

export default Service;
