/* eslint-disable quotes */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('user', [
      {
        id: '47f6daa2-a1ed-495a-ba55-c626b4366c5e',
        first_name: 'Admin',
        last_name: 'User',
        email: 'admin@example.com',
        password: 'test123',
        phone_number: '+15055555555',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  }
};
