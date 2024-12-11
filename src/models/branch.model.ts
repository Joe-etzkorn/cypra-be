import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class Branch extends Model {
  public companyId!: number;
  public branchId!: number;
  public branchName!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Branch.init(
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
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    branchName: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'Branch',
    tableName: 'branches',
  },
);

export default Branch;
