import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';
import Role from './role.model';
import RequestedAccount from './requestedAccount.model';
import UserInvitation from './userInvitation.model';

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public companyName!: string;
  public roleId!: number;
  public parentId!: number;
  public clientId!: string;
  public clientSecret!: string;
  public isAdministrator!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'firstName',
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'lastName',
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'companyName',
    },
    clientId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'clientId',
    },
    clientSecret: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'clientSecret',
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'roleId',
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'parentId',
    },
    isAdministrator: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'isAdministrator',
      defaultValue: 1,
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
