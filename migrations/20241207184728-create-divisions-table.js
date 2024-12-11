'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('divisions', {
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
      divisionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      divisionName: {
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

    await queryInterface.addConstraint('divisions', {
      fields: ['companyId', 'divisionId'],
      type: 'unique',
      name: 'divisions_companyId_divisionId_unique',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint('divisions', 'divisions_companyId_divisionId_unique');
    await queryInterface.removeConstraint('divisions', 'divisions_companyId_fkey');

    await queryInterface.dropTable('divisions');
  },
};
