'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert(tableName.workspaceEquipment, [
      {
        workspace_id: 'b4a3acb9-d1c4-4fca-b35c-20d3fc2c548d',
        equipment_id: '692ab33c-9811-4478-a7d5-62007c55ac37',
        equipment_quantity: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        workspace_id: '653a640e-965f-4465-8e99-e9134b63cba3',
        equipment_id: '692ab33c-9811-4478-a7d5-62007c55ac37',
        equipment_quantity: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        workspace_id: 'b3cb1ef4-6f6b-48c9-ae95-bf2aaf8e8148',
        equipment_id: '692ab33c-9811-4478-a7d5-62007c55ac37',
        equipment_quantity: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        workspace_id: 'd97ee76f-fc3c-4217-b729-ed99bbb34acf',
        equipment_id: 'c52ff55a-f3b0-4b89-9775-9d332b753972',
        equipment_quantity: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        workspace_id: 'd97ee76f-fc3c-4217-b729-ed99bbb34acf',
        equipment_id: '729a47e3-7bae-4f04-a975-1fac669ac858',
        equipment_quantity: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(tableName.workspaceEquipment, null, {});
  }
};
