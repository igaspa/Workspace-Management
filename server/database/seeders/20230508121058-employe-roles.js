'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert(tableName.userRole, [
      {
        user_id: 'ffa719ce-bd7b-4190-97f5-03b92dc4cb2c',
        role_id: 'c40910c3-c2cf-439f-8d5b-be62d7c548be'
      },
      {
        user_id: 'f832b0e2-dfea-4cd3-ba5c-d409dea288ef',
        role_id: 'c40910c3-c2cf-439f-8d5b-be62d7c548be'
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(tableName.userRole, null, {});
  }
};
