'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('6PXzR2ESQ@#', saltRounds);

    await queryInterface.bulkInsert('users', [
      {
        email: 'superadmin@gmail.com',
        password: hashedPassword,
        firstName: 'Super',
        lastName: 'Admin',
        companyName: 'Company SA',
        phone: null,
        roleId: 1,
        parentId: null,
        clientId: null,
        clientSecret: null,
        userCognitoId: '21ab8550-8021-7044-9da1-4cd00d66844c',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
