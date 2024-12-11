'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('opportunity_service_items', {
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      opportunityServiceItemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      opportunityServiceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      catalogItemId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      itemName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      itemDescription: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      itemQuantity: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      itemCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      itemCostOrig: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      occur: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      perPrice: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      perPriceOverride: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      extendedPrice: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      sortOrder: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      itemType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      allocationUnitTypeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      allocationUnitTypeName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      catalogItemCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      catalogItemCategoryName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      perHours: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      extendedHours: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      perHoursOrig: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      overhead: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      breakEven: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      extendedCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      extendedHoursOrig: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      overridePrice: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      unitPriceOverride: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      overrideUnitPrice: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      forceUnitPricing: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      estimatingNotes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      laborExtendedCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      materialExtendedCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      equipmentExtendedCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      subExtendedCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      otherExtendedCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      laborOverhead: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      materialOverhead: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      equipmentOverhead: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      subOverhead: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      otherOverhead: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      laborProfit: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      materialProfit: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      equipmentProfit: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      subProfit: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      otherProfit: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
    });

    
    await queryInterface.addConstraint('opportunity_service_items', {
      fields: ['companyId', 'opportunityServiceItemId'],
      type: 'unique',
      name: 'opportunity_service_items_companyId_opportunityServiceItemId_unique',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('opportunity_service_items', 'opportunity_service_items_companyId_opportunityServiceItemId_unique');
    await queryInterface.dropTable('opportunity_service_items');
  },
};
