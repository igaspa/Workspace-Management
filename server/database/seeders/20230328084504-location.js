'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('location', [
      {
        id: '5419ce7d-c415-480d-a980-cd169559bc85',
        address: 'Poljicka cesta 43',
        city: 'Split',
        country: 'Croatia',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('location', null, {});
  }
};
