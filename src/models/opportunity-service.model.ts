import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class OpportunityService extends Model {
  public companyId!: number;
  public opportunityServiceId!: number;
  public opportunityServiceGroupId!: number | null;
  public branchId!: number | null;
  public branchName!: string | null;
  public serviceId!: number | null;
  public displayName!: string | null;
  public serviceDescription!: string | null;
  public operationNotes!: string | null;
  public occur!: number | null;
  public invoiceType!: string | null;
  public asNeeded!: boolean | null;
  public complexityPercent!: number | null;
  public perHours!: number | null;
  public extendedHours!: number | null;
  public perPrice!: number | null;
  public extendedPrice!: number | null;
  public laborTaxable!: boolean | null;
  public materialTaxable!: boolean | null;
  public equipmentTaxable!: boolean | null;
  public subTaxable!: boolean | null;
  public otherTaxable!: boolean | null;
  public sortOrder!: number | null;
  public tmMaterialMarkupPercent!: number | null;
  public laborMarkup!: number | null;
  public materialMarkup!: number | null;
  public equipmentMarkup!: number | null;
  public subMarkup!: number | null;
  public otherMarkup!: number | null;
  public netProfitPercent!: number | null;
  public laborExtendedPrice!: number | null;
  public materialExtendedPrice!: number | null;
  public equipmentExtendedPrice!: number | null;
  public subExtendedPrice!: number | null;
  public otherExtendedPrice!: number | null;
  public taxableExtendedPrice!: number | null;
  public laborPerExtendedCost!: number | null;
  public materialPerExtendedCost!: number | null;
  public equipmentPerExtendedCost!: number | null;
  public subPerExtendedCost!: number | null;
  public otherPerExtendedCost!: number | null;
  public opportunityId!: number | null;
  public minimumPrice!: number | null;
  public createdDateTime!: Date | null;
  public lastModifiedDateTime!: Date | null;
}

OpportunityService.init(
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
    opportunityServiceId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    opportunityServiceGroupId: {
      type: DataTypes.INTEGER,
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
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    serviceDescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    operationNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    occur: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    invoiceType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    asNeeded: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    complexityPercent: {
      type: DataTypes.FLOAT,
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
    perPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    extendedPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    laborTaxable: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    materialTaxable: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    equipmentTaxable: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    subTaxable: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    otherTaxable: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tmMaterialMarkupPercent: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    laborMarkup: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    materialMarkup: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    equipmentMarkup: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    subMarkup: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    otherMarkup: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    netProfitPercent: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    laborExtendedPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    materialExtendedPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    equipmentExtendedPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    subExtendedPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    otherExtendedPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    taxableExtendedPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    laborPerExtendedCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    materialPerExtendedCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    equipmentPerExtendedCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    subPerExtendedCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    otherPerExtendedCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    opportunityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    minimumPrice: {
      type: DataTypes.FLOAT,
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
  },
  {
    sequelize,
    modelName: 'OpportunityService',
    tableName: 'opportunity_services',
    timestamps: false,
  },
);

export default OpportunityService;
