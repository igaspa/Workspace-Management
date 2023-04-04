/* eslint-disable quotes */
'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert(tableName.user, [
      {
        id: '47f6daa2-a1ed-495a-ba55-c626b4366c5e',
        first_name: 'Admin',
        last_name: 'User',
        email: 'admin@example.com',
        password: '$2b$10$He0zyaPjngh35c.Bgp.nhOn85Et0bnIgr5AUcZ1/40xbnP8V/uvDK',
        phone_number: '+15055555555',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(tableName.user, null, {});
  }
};
