'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('services', {
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
      serviceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      serviceTypeName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      serviceName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      serviceNameAbr: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      displayName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    });

    await queryInterface.addConstraint('services', {
      fields: ['companyId', 'serviceId'],
      type: 'unique',
      name: 'services_companyId_serviceId_unique',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('services', 'services_companyId_serviceId_unique');
    await queryInterface.dropTable('services');
  },
};
