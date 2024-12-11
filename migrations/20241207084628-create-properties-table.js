'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('properties', {
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
      propertyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      propertyStatusName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      branchName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      productionManagerContactName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      propertyAddressLine1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      propertyAddressLine2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      propertyAddressCity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      propertyAddressStateProvinceCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      propertyAddressZipCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      leadSourceName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      propertyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      earliestOpportunityWonDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addConstraint('properties', {
      fields: ['companyId', 'propertyId'],
      type: 'unique',
      name: 'properties_companyId_propertyId_unique',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint('properties', 'properties_companyId_propertyId_unique');
    await queryInterface.dropTable('properties');
  },
};
