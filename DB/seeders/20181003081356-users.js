const sha1 = require('sha1')

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
        name: 'a',
        role: 'admin',
        password: sha1('123'),
        email: 'a@a.com',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'i',
        role: 'user',
        password: sha1('123'),
        email: 'b@b.com',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};