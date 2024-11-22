'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('12345', saltRounds);

    await queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', { email: 'admin@gmail.com' }, {});
  },
};
