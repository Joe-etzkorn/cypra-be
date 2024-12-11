'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('receipts', {
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
      receiptId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      branchId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      branchName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      receiptNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendorInvoiceDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      receiptStatusName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      workTicketId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      workTicketNumber: {
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
      receivedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      approvedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      receiptTotalCost: {
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
    });

    await queryInterface.addConstraint('receipts', {
      fields: ['companyId', 'receiptId'],
      type: 'unique',
      name: 'receipts_companyId_receiptId_unique',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('receipts', 'receipts_companyId_receiptId_unique');
    await queryInterface.dropTable('receipts');
  },
};
