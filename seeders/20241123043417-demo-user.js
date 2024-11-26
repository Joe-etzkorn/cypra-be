'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('12345', saltRounds);

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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'admin@gmail.com',
        password: hashedPassword,
        firstName: 'Normal',
        lastName: 'Admin',
        companyName: 'Company A',
        roleId: 2,
        parentId: 1,
        clientId: 'admin123',
        clientSecret: 'admin_secret',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user@gmail.com',
        password: hashedPassword,
        firstName: 'Normal',
        lastName: 'User',
        companyName: 'Company U',
        roleId: 3,
        parentId: 2,
        clientId: null,
        clientSecret: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', {
      email: {
        [Sequelize.Op.in]: ['superadmin@gmail.com', 'admin@gmail.com', 'user@gmail.com']
      }
    }, {});
  },
};
