'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert(tableName.workspaceType, [
      {
        id: '1dcdda55-3a43-4dc7-bc0d-0ccf99350502',
        max_reservation_time_daily: '02:00:00',
        max_reservation_time_overall: '06:00:00',
        name: 'Phone Booth',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '07c0865e-f27c-414e-bd0b-ed5178d9aeb5',
        max_reservation_time_daily: '02:00:00',
        max_reservation_time_overall: '06:00:00',
        name: 'Conference Room',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        max_reservation_time_daily: '24:00:00',
        max_reservation_time_overall: '120:00:00',
        name: 'Desk',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(tableName.workspaceType, null, {});
  }
};
