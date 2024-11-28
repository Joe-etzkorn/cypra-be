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
        roleId: 1,
        parentId: null,
        clientId: null,
        clientSecret: null,
        userCognitoId: '21ab8550-8021-7044-9da1-4cd00d66844c',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'admin@gmail.com',
        password: hashedPassword,
        firstName: 'Normal',
        lastName: 'Admin',
        companyName: 'G&G Landscaping',
        roleId: 2,
        parentId: 1,
        clientId: 'dec26e30-bc1e-472d-bee5-69f8b4d064e6',
        clientSecret: 'I2zhF2sF4pvo50x9jBnTLUmB7U13Heve',
        userCognitoId: '717bb5e0-b041-706a-1a81-bd5cc69cb895',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user@gmail.com',
        password: hashedPassword,
        firstName: 'Normal',
        lastName: 'User',
        companyName: 'G&G Landscaping',
        roleId: 3,
        parentId: 2,
        clientId: null,
        clientSecret: null,
        userCognitoId: 'b17b8560-1021-70e0-c60c-3b445414f7ed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
