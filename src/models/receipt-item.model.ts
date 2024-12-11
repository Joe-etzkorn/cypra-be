import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class ReceiptItem extends Model {
  public companyId!: number;
  public receiptId!: number;
  public receiptItemId!: number;
  public catalogItemId!: number | null;
  public catalogItemName!: string | null;
  public itemName!: string | null;
  public itemQuantity!: number | null;
  public itemUnitCost!: number | null;
  public itemExtendedCost!: number | null;
  public itemType!: string | null;
  public itemEstUnitCost!: number | null;
  public receivedQuantity!: number | null;
  public catalogItemCategoryId!: number | null;
}

ReceiptItem.init(
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
    },
    receiptItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    catalogItemId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    catalogItemName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    itemQuantity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    itemUnitCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    itemExtendedCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    itemType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    itemEstUnitCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    receivedQuantity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    catalogItemCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'ReceiptItem',
    tableName: 'receipt_items',
    timestamps: false,
  },
);

export default ReceiptItem;
