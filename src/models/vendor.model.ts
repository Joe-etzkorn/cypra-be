import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class Vendor extends Model {
  public companyId!: number;
  public vendorId!: number;
  public branchId!: number | null;
  public branchName!: string | null;
  public vendorName!: string | null;
  public accountingVendorId!: string | null;
  public createdDateTime!: Date | null;
  public active!: boolean;
}

Vendor.init(
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
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    branchName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vendorName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accountingVendorId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdDateTime: {
      type: DataTypes.DATE,
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
    modelName: 'Vendor',
    tableName: 'vendors',
    timestamps: false,
  },
);

export default Vendor;
