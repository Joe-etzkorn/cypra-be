'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('branches', {
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
      branchId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      branchName: {
        type: Sequelize.STRING,
        allowNull: false,
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

    await queryInterface.addConstraint('branches', {
      fields: ['companyId', 'branchId'],
      type: 'unique',
      name: 'branches_companyId_branchId_unique',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint('branches', 'branches_companyId_branchId_unique');
    await queryInterface.removeConstraint('branches', 'branches_companyId_fkey');

    await queryInterface.dropTable('branches');
  },
};
