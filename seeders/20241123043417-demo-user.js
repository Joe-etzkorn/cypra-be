'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('6PXzR2ESQ@#', saltRounds);

    await queryInterface.bulkInsert('users', [
      // {
      //   email: 'jegan@cypra.io',
      //   password: hashedPassword,
      //   firstName: 'Super',
      //   lastName: 'Admin 1',
      //   companyName: 'CYPRA.IO',
      //   phone: null,
      //   roleId: 1,
      //   parentId: null,
      //   clientId: null,
      //   clientSecret: null,
      //   userCognitoId: '81cbc5d0-20a1-7002-b730-e296d8f80057',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      {
        email: 'etzkornjoe@gmail.com',
        password: hashedPassword,
        firstName: 'Super',
        lastName: 'Admin 2',
        companyName: 'CYPRA.IO',
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
