import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/db';
import User from './user.model';

class RequestedAccount extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone?: string;
  public companyName?: string;
  public comments?: string;
  public hasUsedAspire!: boolean;
  public userId?: string;
  public hasExistedAccount!: boolean;
  public token?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public user?: User;
}

RequestedAccount.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
    },
    companyName: {
      type: DataTypes.STRING,
    },
    comments: {
      type: DataTypes.TEXT,
    },
    hasUsedAspire: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    hasExistedAccount: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
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
    tableName: 'requested_accounts',
    timestamps: true,
  },
);

export default RequestedAccount;
