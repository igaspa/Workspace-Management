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
      },
      {
        id: 'e88af55a-5039-403d-8356-681d7246e487',
        name: 'iPhone 12',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'cff24a3f-f656-4d78-9025-55f0e25276bf',
        name: 'Samsung Galaxy S21',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'f92b64ff-702d-4323-a47f-b09a55b7c9b9',
        name: 'Ipad 8',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'f1293a71-76c5-409c-a75d-1c8fec8f27ea',
        name: 'Psychological Monitoring Device',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '361ee388-8069-4887-93b7-f85a19e1139e',
        name: 'D-Link',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '2ea26329-f423-48bb-9e09-6cf861f3c01b',
        name: 'Logitech G435 Mouse',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '2562ee71-1442-4ce7-9e2b-e311be050199',
        name: 'Omron Body Scale',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '6427a70a-4c69-47b9-b252-3dac0bdbddbc',
        name: 'Power Outlet',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(tableName.equipment, null, {});
  }
};
