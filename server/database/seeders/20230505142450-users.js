'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert(tableName.user, [
      {
        id: 'ffa719ce-bd7b-4190-97f5-03b92dc4cb2c',
        first_name: 'Ivana',
        last_name: 'Gasparov',
        email: 'ivana.gasparov@agilathon.com',
        password: '$2b$10$He0zyaPjngh35c.Bgp.nhOn85Et0bnIgr5AUcZ1/40xbnP8V/uvDK',
        phone_number: '+15055555555',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'f832b0e2-dfea-4cd3-ba5c-d409dea288ef',
        first_name: 'Lovre',
        last_name: 'Begovic',
        email: 'lovre.begovic@agilathon.com',
        phone_number: '+15055555555',
        password: '$2b$10$He0zyaPjngh35c.Bgp.nhOn85Et0bnIgr5AUcZ1/40xbnP8V/uvDK',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(tableName.user, null, {});
  }
};
