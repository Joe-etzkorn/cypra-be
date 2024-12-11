'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('invoices', {
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
      invoiceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      invoiceBatchId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      invoiceBatchNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      invoiceAccountingPeriod: {
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
      branchCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      propertyId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      propertyName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      primaryContactId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      primaryContactName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      billingContactId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      billingContactName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      invoiceNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      invoiceDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      invoiceAddressId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      addressLine1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      addressLine2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      stateProvinceCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      zipCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      amountRemaining: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      origAmount: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      paymentTermsId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      paymentTermsName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      invoiceNote: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      emailStatus: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      reportLayoutId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      reportLayoutName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      taxJurisdictionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      taxJurisdictionName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      invoiceNumberPrefix: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastModifiedDateTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      lastModifiedByUserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      lastModifiedByUserName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      completedDateTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    
    await queryInterface.addConstraint('invoices', {
      fields: ['companyId', 'invoiceId'],
      type: 'unique',
      name: 'invoices_companyId_invoiceId_unique',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('invoices', 'invoices_companyId_invoiceId_unique');
    await queryInterface.dropTable('invoices');
  },
};
