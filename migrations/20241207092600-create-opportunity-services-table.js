'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('opportunity_services', {
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
      opportunityServiceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      opportunityServiceGroupId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      branchId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      branchName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      serviceId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      displayName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      serviceDescription: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      operationNotes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      occur: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      invoiceType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      asNeeded: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      complexityPercent: {
        type: Sequelize.FLOAT,
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
      perPrice: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      extendedPrice: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      laborTaxable: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      materialTaxable: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      equipmentTaxable: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      subTaxable: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      otherTaxable: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      sortOrder: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      tmMaterialMarkupPercent: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      laborMarkup: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      materialMarkup: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      equipmentMarkup: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      subMarkup: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      otherMarkup: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      netProfitPercent: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      laborExtendedPrice: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      materialExtendedPrice: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      equipmentExtendedPrice: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      subExtendedPrice: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      otherExtendedPrice: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      taxableExtendedPrice: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      laborPerExtendedCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      materialPerExtendedCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      equipmentPerExtendedCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      subPerExtendedCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      otherPerExtendedCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      opportunityId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      minimumPrice: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      createdDateTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      lastModifiedDateTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addConstraint('opportunity_services', {
      fields: ['companyId', 'opportunityServiceId'],
      type: 'unique',
      name: 'opportunity_services_companyId_opportunityServiceId_unique',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('opportunity_services', 'opportunity_services_companyId_opportunityServiceId_unique');
    await queryInterface.dropTable('opportunity_services');
  },
};
