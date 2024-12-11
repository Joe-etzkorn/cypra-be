'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('opportunity_service_default_pay_codes', {
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
      opportunityServiceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      opportunityServiceDefaultPayCodeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      payCodeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      payScheduleId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });

await queryInterface.addConstraint('opportunity_service_default_pay_codes', {
  fields: ['companyId', 'opportunityServiceId', 'opportunityServiceDefaultPayCodeId'],
  type: 'unique',
  name: 'opportunity_service_default_pay_codes_companyId_opportunityServiceId_opportunityServiceDefaultPayCodeId_unique',
});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('opportunity_service_default_pay_codes', 'opportunity_service_default_pay_codes_companyId_opportunityServiceId_opportunityServiceDefaultPayCodeId_unique');
    await queryInterface.dropTable('opportunity_service_default_pay_codes');
  },
};
