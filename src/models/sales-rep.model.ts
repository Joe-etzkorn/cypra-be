import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class SalesRep extends Model {
  public companyId!: number;
  public salesRepId!: number;
  public salesRepName!: string;
  public salesRepEmail!: string | null;
  public createdAt!: Date;
  public updatedAt!: Date;
}

SalesRep.init(
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
    salesRepId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    salesRepName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salesRepEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'SalesRep',
    tableName: 'sales_reps',
  },
);

export default SalesRep;
