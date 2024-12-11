'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('item_allocations', {
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
      workTicketNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      itemAllocationId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      inventoryLocationName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      itemName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      itemType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      catalogItemId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      catalogItemName: {
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
      itemTotalCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      createdDateTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      acceptedDateTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      allocationStatus: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      itemAllocationDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      lastModifiedDateTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      subcontractorServicesRenderedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addConstraint('item_allocations', {
      fields: ['companyId', 'itemAllocationId'],
      type: 'unique',
      name: 'item_allocations_companyId_itemAllocationId_unique',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('item_allocations', 'item_allocations_companyId_itemAllocationId_unique');
    await queryInterface.dropTable('item_allocations');
  },
};
