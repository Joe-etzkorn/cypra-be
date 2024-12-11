'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vendors', {
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
      vendorId: {
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
      vendorName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      accountingVendorId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdDateTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    });

    await queryInterface.addConstraint('vendors', {
      fields: ['companyId', 'vendorId'],
      type: 'unique',
      name: 'vendors_companyId_vendorId_unique',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('vendors', 'vendors_companyId_vendorId_unique');
    await queryInterface.dropTable('vendors');
  },
};
