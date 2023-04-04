'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(tableName.workspace, [
      {
        id: 'cae42cfe-1c81-42ce-84d3-222881f76519',
        type_id: '1dcdda55-3a43-4dc7-bc0d-0ccf99350502',
        name: 'Phone Booth Green 1',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName.workspace, null, {});
  }
};
