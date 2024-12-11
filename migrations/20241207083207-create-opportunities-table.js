'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('opportunities', {
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
      opportunityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      propertyId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      opportunityStatusId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      opportunityStatusName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      salesRepContactId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      salesRepContactName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      operationsManagerContactId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      operationsManagerContactName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      divisionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      divisionName: {
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
      salesTypeName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      leadSourceName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      masterOpportunityId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      opportunityType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      approvedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      proposedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      wonDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      lostDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      probability: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      anticipatedCloseDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      invoiceType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      estimatedDollars: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      createdByUserName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdByUserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      approvedUserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      approvedUserName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      closedUserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      closedUserName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      competitorName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lostReason: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      opportunityNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      estimatedCostDollars: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      estimatedOverheadDollars: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      estimatedBreakEvenDollars: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      estimatedNetProfitPercent: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      estimatedGrossMarginPercent: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      estimatedGrossMarginDollars: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      estimatedLaborHours: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      estimatedLaborCostPerHour: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      estimatedRealizeRate: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      estimatedEquipmentCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      estimatedLaborCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      estimatedMaterialCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      estimatedOtherCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      estimatedSubCost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      actualCostDollars: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      actualGrossMarginPercent: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      actualGrossMarginDollars: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      actualLaborHours: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      actualLaborCostPerHour: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      actualEarnedRevenue: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      percentComplete: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      renewalDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      modifiedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      jobStatusName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      propertyName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      actualCostSub: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      actualCostMaterial: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      actualCostLabor: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      completeDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      opportunityStageId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      opportunityStageName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      opportunityStage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      opportunityStatus: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });

    await queryInterface.addConstraint('opportunities', {
      fields: ['companyId', 'opportunityId'],
      type: 'unique',
      name: 'opportunities_companyId_opportunityId_unique',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint('opportunities', 'opportunities_companyId_opportunityId_unique');
    
    await queryInterface.dropTable('opportunities');
  },
};
