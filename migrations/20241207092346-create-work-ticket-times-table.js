'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('work_ticket_times', {
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
      workTicketTimeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      workTicketId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      workTicketNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contactId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      contactName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      workTicketTimeDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      endTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      opportunityServiceLaborRate: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      hours: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      othours: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      warrantyTime: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      distributedTime: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      burdenedCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      invoiceId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      invoiceNumber: {
        type: Sequelize.STRING,
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
      approvedDateTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      acceptedDateTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      breakTime: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      baseHourlyRate: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      routeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      routeName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      crewLeaderContactId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      crewLeaderContactName: {
        type: Sequelize.STRING,
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
    });

    await queryInterface.addConstraint('work_ticket_times', {
      fields: ['companyId', 'workTicketTimeId'],
      type: 'unique',
      name: 'work_ticket_times_companyId_workTicketTimeId_unique',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('work_ticket_times', 'work_ticket_times_companyId_workTicketTimeId_unique');
    await queryInterface.dropTable('work_ticket_times');
  },
};
