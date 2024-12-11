import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class Receipt extends Model {
  public companyId!: number;
  public receiptId!: number;
  public branchId!: number | null;
  public branchName!: string | null;
  public vendorId!: number | null;
  public receiptNumber!: string | null;
  public vendorInvoiceDate!: Date | null;
  public receiptStatusName!: string | null;
  public workTicketId!: number | null;
  public workTicketNumber!: string | null;
  public createdDateTime!: Date | null;
  public lastModifiedDateTime!: Date | null;
  public receivedDate!: Date | null;
  public approvedDate!: Date | null;
  public receiptTotalCost!: number | null;
  public opportunityId!: number | null;
  public opportunityNumber!: string | null;
}

Receipt.init(
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
    receiptId: {
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
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    receiptNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vendorInvoiceDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    receiptStatusName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    workTicketId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    workTicketNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lastModifiedDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    receivedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    approvedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    receiptTotalCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    opportunityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    opportunityNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Receipt',
    tableName: 'receipts',
    timestamps: false,
  },
);

export default Receipt;
