import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class Division extends Model {
  public companyId!: number;
  public divisionId!: number;
  public divisionName!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Division.init(
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
    divisionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    divisionName: {
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
    modelName: 'Division',
    tableName: 'divisions',
  },
);

export default Division;
