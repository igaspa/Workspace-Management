'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert(tableName.location, [
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

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(tableName.location, null, {});
  }
};
