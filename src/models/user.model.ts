import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}
User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'email', // explicitly set the column name
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'createdAt',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updatedAt',
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  },
);

export default User;
