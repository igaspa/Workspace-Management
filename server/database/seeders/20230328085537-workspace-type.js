'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert(tableName.workspaceType, [
      {
        id: '1dcdda55-3a43-4dc7-bc0d-0ccf99350502',
        max_reservation_interval: '02:00:00',
        max_reservation_window: '2 days',
        name: 'Phone Booth',
        allow_permanent_reservations: false,
        allow_multiple_participants: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '07c0865e-f27c-414e-bd0b-ed5178d9aeb5',
        max_reservation_interval: '08:00:00',
        max_reservation_window: '15 days',
        name: 'Conference Room',
        allow_permanent_reservations: false,
        allow_multiple_participants: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        max_reservation_interval: '24:00:00',
        max_reservation_window: '7 days',
        name: 'Desk',
        allow_permanent_reservations: true,
        allow_multiple_participants: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(tableName.workspaceType, null, {});
  }
};
