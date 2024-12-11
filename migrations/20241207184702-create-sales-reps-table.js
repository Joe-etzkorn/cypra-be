'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales_reps', {
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
      salesRepId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      salesRepName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      salesRepEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addConstraint('sales_reps', {
      fields: ['companyId', 'salesRepId'],
      type: 'unique',
      name: 'sales_reps_companyId_salesRepId_unique',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint('sales_reps', 'sales_reps_companyId_salesRepId_unique');
    await queryInterface.dropTable('sales_reps');
  },
};
