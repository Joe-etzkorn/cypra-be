'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('work_ticket_visits', {
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
      workTicketVisitId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      routeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      scheduledDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      sequenceNum: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      workTicketId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      hours: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      routeName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      workTicketNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });

    await queryInterface.addConstraint('work_ticket_visits', {
      fields: ['companyId', 'workTicketVisitId'],
      type: 'unique',
      name: 'work_ticket_visits_companyId_workTicketVisitId_unique',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('work_ticket_visits', 'work_ticket_visits_companyId_workTicketVisitId_unique');
    await queryInterface.dropTable('work_ticket_visits');
  },
};
