'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('opportunity_service_routes', {
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
      routeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      routeName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });

    await queryInterface.addConstraint('opportunity_service_routes', {
      fields: ['companyId', 'opportunityServiceId', 'routeId'],
      type: 'unique',
      name: 'opportunity_service_routes_companyId_opportunityServiceId_routeId_unique',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('opportunity_service_routes', 'opportunity_service_routes_companyId_opportunityServiceId_routeId_unique');
    await queryInterface.dropTable('opportunity_service_routes');
  },
};
