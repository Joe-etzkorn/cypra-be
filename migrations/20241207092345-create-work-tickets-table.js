'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('work_tickets', {
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
      workTicketId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      opportunityServiceId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      contractYear: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      occur: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      annualizedOccur: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      createdDateTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      anticStartDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      scheduledStartDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      completeDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      approvedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      workTicketStatusId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      workTicketStatusName: {
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
      hoursEst: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      hourCostEst: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      materialCostEst: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      equipCostEst: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      subCostEst: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      otherCostEst: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      tmCalcAmount: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      tmOverrideAmount: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      invoicedAmount: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      workTicketNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hoursAct: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      warrantyHoursAct: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      laborCostAct: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      materialCostAct: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      equipmentCostAct: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      subCostAct: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      otherCostAct: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      totalCostAct: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      earnedRevenue: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      realizeRateRevenue: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      opportunityId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      opportunityNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      estRealizeRateRevenue: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      distributedHours: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      partialOccurence: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      branchName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastModifiedDateTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      workTicketStatus: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hoursScheduled: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      hoursUnscheduled: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      reviewedDateTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      reviewedUserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      reviewedUserName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      propertyId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });

    await queryInterface.addConstraint('work_tickets', {
      fields: ['companyId', 'workTicketId'],
      type: 'unique',
      name: 'work_tickets_companyId_workTicketId_unique',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint('work_tickets', 'work_tickets_companyId_workTicketId_unique');
    await queryInterface.dropTable('work_tickets');
  },
};
