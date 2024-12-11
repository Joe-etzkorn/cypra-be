'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('receipt_items', {
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
      receiptItemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      catalogItemId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      catalogItemName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      itemName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      itemQuantity: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      itemUnitCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      itemExtendedCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      itemType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      itemEstUnitCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      receivedQuantity: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      catalogItemCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });

    await queryInterface.addConstraint('receipt_items', {
      fields: ['companyId', 'receiptItemId'],
      type: 'unique',
      name: 'receipt_items_companyId_receiptItemId_unique',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('receipt_items', 'receipt_items_companyId_receiptItemId_unique');
    await queryInterface.dropTable('receipt_items');
  },
};
