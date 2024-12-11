'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('opportunity_statuses', {
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
      opportunityStatusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      opportunityStatusName: {
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

    await queryInterface.addConstraint('opportunity_statuses', {
      fields: ['companyId', 'opportunityStatusId'],
      type: 'unique',
      name: 'opportunity_statuses_companyId_opportunityStatusId_unique',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint('opportunity_statuses', 'opportunity_statuses_companyId_opportunityStatusId_unique');
    
    await queryInterface.dropTable('opportunity_statuses');
  },
};
