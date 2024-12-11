'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('work_ticket_revenues', {
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
      workTicketRevenueId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      revenueMonth: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      revenueAmount: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      createdDateTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      accountingPeriodName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      accountingPeriodYear: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      accountingPeriodId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });

    await queryInterface.addConstraint('work_ticket_revenues', {
      fields: ['companyId', 'workTicketRevenueId'],
      type: 'unique',
      name: 'work_ticket_revenues_companyId_workTicketRevenueId_unique',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('work_ticket_revenues', 'work_ticket_revenues_companyId_workTicketRevenueId_unique');
    await queryInterface.dropTable('work_ticket_revenues');
  },
};
