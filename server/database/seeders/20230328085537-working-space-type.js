'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert(tableName.workspaceType, [
      {
        id: '1dcdda55-3a43-4dc7-bc0d-0ccf99350502',
        reservation_time: '00:15:00',
        name: 'Phone Booth',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '07c0865e-f27c-414e-bd0b-ed5178d9aeb5',
        reservation_time: '00:15:00',
        name: 'Conference Room',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(tableName.workspaceType, null, {});
  }
};
