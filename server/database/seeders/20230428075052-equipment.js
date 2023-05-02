'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert(tableName.equipment, [
      {
        id: '692ab33c-9811-4478-a7d5-62007c55ac37',
        name: 'LG Monitor',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '729a47e3-7bae-4f04-a975-1fac669ac858',
        name: 'Camera',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'c52ff55a-f3b0-4b89-9775-9d332b753972',
        name: 'Microphone',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(tableName.equipment, null, {});
  }
};
