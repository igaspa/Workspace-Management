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
        image: 'https://cdn-icons-png.flaticon.com/512/3774/3774035.png',
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
        // eslint-disable-next-line max-len
        image: 'https://media.istockphoto.com/id/1168331040/vector/online-meeting-vector-line-icon-video-chat-colleague.jpg?s=612x612&w=0&k=20&c=KbvBybxXaCwj-x6RHLKpYQD9M9IMc06dW7Rls7ojE8g=',
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
        // eslint-disable-next-line max-len
        image: 'https://img.freepik.com/premium-vector/computer-workplace-icon-business-people-communication-vector-illustration-stock-image_756957-162.jpg?w=2000',
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
