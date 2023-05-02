'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert(tableName.workspace, [
      {
        id: 'cae42cfe-1c81-42ce-84d3-222881f76519',
        type_id: '1dcdda55-3a43-4dc7-bc0d-0ccf99350502',
        name: 'Phone Booth Green 1',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'b4a3acb9-d1c4-4fca-b35c-20d3fc2c548d',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 1',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '653a640e-965f-4465-8e99-e9134b63cba3',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 2',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'b3cb1ef4-6f6b-48c9-ae95-bf2aaf8e8148',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 3',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '87dcd43e-4bed-4897-8442-920ecd2fa349',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 4',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '618608b3-8f06-4e12-a567-9677398233ce',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 5',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'd97ee76f-fc3c-4217-b729-ed99bbb34acf',
        type_id: '07c0865e-f27c-414e-bd0b-ed5178d9aeb5',
        name: 'Conference Room 1',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(tableName.workspace, null, {});
  }
};
