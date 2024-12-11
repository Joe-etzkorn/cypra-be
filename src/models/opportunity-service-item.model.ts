import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class OpportunityServiceItem extends Model {
  public companyId!: number;
  public opportunityServiceItemId!: number;
  public opportunityServiceId!: number;
  public catalogItemId?: number;
  public itemName?: string;
  public itemDescription?: string;
  public itemQuantity?: number;
  public itemCost?: number;
  public itemCostOrig?: number;
  public occur?: number;
  public perPrice?: number;
  public perPriceOverride?: number;
  public extendedPrice?: number;
  public sortOrder?: number;
  public itemType?: string;
  public allocationUnitTypeId?: number;
  public allocationUnitTypeName?: string;
  public catalogItemCategoryId?: number;
  public catalogItemCategoryName?: string;
  public perHours?: number;
  public extendedHours?: number;
  public perHoursOrig?: number;
  public overhead?: number;
  public breakEven?: number;
  public extendedCost?: number;
  public extendedHoursOrig?: number;
  public overridePrice?: boolean;
  public unitPriceOverride?: number;
  public overrideUnitPrice?: boolean;
  public forceUnitPricing?: boolean;
  public estimatingNotes?: string;
  public laborExtendedCost?: number;
  public materialExtendedCost?: number;
  public equipmentExtendedCost?: number;
  public subExtendedCost?: number;
  public otherExtendedCost?: number;
  public laborOverhead?: number;
  public materialOverhead?: number;
  public equipmentOverhead?: number;
  public subOverhead?: number;
  public otherOverhead?: number;
  public laborProfit?: number;
  public materialProfit?: number;
  public equipmentProfit?: number;
  public subProfit?: number;
  public otherProfit?: number;
}

OpportunityServiceItem.init(
  {
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',  // Model users
        key: 'id',
      },
    },
    opportunityServiceItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    opportunityServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    catalogItemId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    itemDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    itemQuantity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    itemCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    itemCostOrig: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    occur: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    perPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    perPriceOverride: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    extendedPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    sortOrder: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    itemType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    allocationUnitTypeId: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    allocationUnitTypeName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    catalogItemCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    catalogItemCategoryName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    perHours: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    extendedHours: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    perHoursOrig: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    overhead: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    breakEven: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    extendedCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    extendedHoursOrig: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    overridePrice: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    unitPriceOverride: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    overrideUnitPrice: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    forceUnitPricing: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    estimatingNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    laborExtendedCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    materialExtendedCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    equipmentExtendedCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    subExtendedCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    otherExtendedCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    laborOverhead: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    materialOverhead: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    equipmentOverhead: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    subOverhead: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    otherOverhead: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    laborProfit: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    materialProfit: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    equipmentProfit: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    subProfit: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    otherProfit: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'OpportunityServiceItem',
    tableName: 'opportunity_service_items',
    timestamps: false,
  }
);

export default OpportunityServiceItem;
