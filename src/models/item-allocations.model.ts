import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class ItemAllocation extends Model {
  public companyId!: number;
  public workTicketId?: number;
  public workTicketNumber?: string;
  public itemAllocationId!: number;
  public inventoryLocationName?: string | null;
  public itemName?: string | null;
  public itemType?: string | null;
  public catalogItemId?: number | null;
  public catalogItemName?: string | null;
  public itemQuantity?: number | null;
  public itemUnitCost?: number | null;
  public itemTotalCost?: number | null;
  public createdDateTime?: Date | null;
  public acceptedDateTime?: Date | null;
  public allocationStatus?: string | null;
  public itemAllocationDate?: Date | null;
  public lastModifiedDateTime?: Date | null;
  public subcontractorServicesRenderedDate?: Date | null;
  
}

ItemAllocation.init(
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
    workTicketId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    workTicketNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    itemAllocationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    inventoryLocationName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    itemType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    catalogItemId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    catalogItemName: {
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
    itemTotalCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    createdDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    acceptedDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    allocationStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    itemAllocationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lastModifiedDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    subcontractorServicesRenderedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'ItemAllocation',
    tableName: 'item_allocations',
    timestamps: false,
  },
);

export default ItemAllocation;
