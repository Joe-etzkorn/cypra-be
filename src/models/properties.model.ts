import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class Property extends Model {
  public companyId!: number;
  public propertyId!: number;
  public propertyStatusName!: string;
  public branchName!: string;
  public productionManagerContactName!: string | null;
  public propertyAddressLine1!: string | null;
  public propertyAddressLine2!: string | null;
  public propertyAddressCity!: string | null;
  public propertyAddressStateProvinceCode!: string | null;
  public propertyAddressZipCode!: string | null;
  public leadSourceName!: string | null;
  public propertyName!: string;
  public earliestOpportunityWonDate!: Date | null;
}

Property.init(
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
    propertyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    propertyStatusName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    branchName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    productionManagerContactName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    propertyAddressLine1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    propertyAddressLine2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    propertyAddressCity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    propertyAddressStateProvinceCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    propertyAddressZipCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    leadSourceName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    propertyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    earliestOpportunityWonDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Property',
    tableName: 'properties',
    timestamps: false,
  },
);

export default Property;
