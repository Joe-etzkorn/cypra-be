import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class Invoice extends Model {
  public companyId!: number;
  public invoiceId!: number;
  public invoiceBatchId!: number | null;
  public invoiceBatchNumber!: string | null;
  public invoiceAccountingPeriod!: string | null;
  public branchId!: number | null;
  public branchName!: string | null;
  public branchCode!: string | null;
  public propertyId!: number | null;
  public propertyName!: string | null;
  public primaryContactId!: number | null;
  public primaryContactName!: string | null;
  public billingContactId!: number | null;
  public billingContactName!: string | null;
  public invoiceNumber!: string | null;
  public invoiceDate!: Date | null;
  public amount!: number | null;
  public invoiceAddressId!: number | null;
  public addressLine1!: string | null;
  public addressLine2!: string | null;
  public city!: string | null;
  public stateProvinceCode!: string | null;
  public zipCode!: string | null;
  public amountRemaining!: number | null;
  public origAmount!: number | null;
  public paymentTermsId!: number | null;
  public paymentTermsName!: string | null;
  public invoiceNote!: string | null;
  public emailStatus!: string | null;
  public dueDate!: Date | null;
  public reportLayoutId!: number | null;
  public reportLayoutName!: string | null;
  public taxJurisdictionId!: number | null;
  public taxJurisdictionName!: string | null;
  public invoiceNumberPrefix!: string | null;
  public lastModifiedDateTime!: Date | null;
  public lastModifiedByUserId!: number | null;
  public lastModifiedByUserName!: string | null;
  public completedDateTime!: Date | null;
}

Invoice.init(
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
    invoiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    invoiceBatchId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    invoiceBatchNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    invoiceAccountingPeriod: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    branchName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    branchCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    propertyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    primaryContactId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    primaryContactName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    billingContactId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    billingContactName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    invoiceNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    invoiceDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    invoiceAddressId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    addressLine2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stateProvinceCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amountRemaining: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    origAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    paymentTermsId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    paymentTermsName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    invoiceNote: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    emailStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    reportLayoutId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reportLayoutName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    taxJurisdictionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    taxJurisdictionName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    invoiceNumberPrefix: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastModifiedDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lastModifiedByUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lastModifiedByUserName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    completedDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Invoice',
    tableName: 'invoices',
    timestamps: false,
  },
);

export default Invoice;
