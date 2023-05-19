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
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'a385ea94-ab46-4181-9a96-ccadf3cdef39',
        type_id: '1dcdda55-3a43-4dc7-bc0d-0ccf99350502',
        name: 'Phone Booth Green 2',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'd63788be-41d4-42e4-a42a-cf31eda0839b',
        type_id: '1dcdda55-3a43-4dc7-bc0d-0ccf99350502',
        name: 'Phone Booth Blue 1',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '312f8f1b-d8f4-486b-8ce3-8ab48c4abac8',
        type_id: '1dcdda55-3a43-4dc7-bc0d-0ccf99350502',
        name: 'Phone Booth Blue 2',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'b4a3acb9-d1c4-4fca-b35c-20d3fc2c548d',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 1',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '653a640e-965f-4465-8e99-e9134b63cba3',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 2',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'b3cb1ef4-6f6b-48c9-ae95-bf2aaf8e8148',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 3',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '87dcd43e-4bed-4897-8442-920ecd2fa349',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 4',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '618608b3-8f06-4e12-a567-9677398233ce',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 5',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'e370f32b-6261-4612-a2ff-9582acffb746',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 6',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '44c94592-0b38-4e6e-b5f7-eba36cc924e2',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 7',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'c743be6f-50b0-49dc-b261-63e95e3171a2',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 8',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'edd9866f-4faf-4165-afc6-25e5509cad63',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 9',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '575e364b-5dcc-431f-8deb-db93797d3a96',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 10',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '48c24de8-c6a4-4621-8949-f0b1ae84511c',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 11',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'cec40cac-163f-4fe5-a913-135e11ed9197',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 12',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'd8d2532d-97d2-4070-bda9-9516f7b442ee',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 13',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'a9872273-45a4-4a7c-ba0f-3bda98d5d492',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 14',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '8db5dd8a-3f77-4956-aa36-587bcf2a6ee6',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 15',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'f559ce57-ea81-4144-8fc9-c258372776ae',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 16',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '79605a78-c02e-4e95-8592-25e13058d601',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 17',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '9274e3f7-495e-41b0-b771-1a26caf7a4ce',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 18',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '6ad7cc58-d34c-4ef0-bd63-6724245f8f1f',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 19',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'c33acdc1-a129-44bc-9e20-749e27eb497b',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 20',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '2807bc91-e1fe-4c8f-a321-0918cdae4716',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 21',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'd0c4cfcf-e423-4099-8731-cf757830e0a7',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 22',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '3fec0d88-ed98-4387-a545-e0991dc41891',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 23',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'a4117395-a769-4180-afa1-6f885dca0889',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 24',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'dca8ebf6-d0da-494d-a789-47482b934862',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 25',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'fa3a5152-0d77-4ab6-839d-e949e51992c2',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 26',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '8ce6293e-e25d-4392-90a9-8a31016cbe0c',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 27',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '8fe81196-7691-4925-ac16-a22a3f9c46ed',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 28',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'ac7c7d7d-6902-44fc-ba1e-ffcc78f8e61e',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 29',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '36a5605b-4064-4202-948f-9cb62e9eb30e',
        type_id: 'eb6e1123-f8c4-43d4-9491-fbaa214cb53a',
        name: 'Desk 30',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 1,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'd97ee76f-fc3c-4217-b729-ed99bbb34acf',
        type_id: '07c0865e-f27c-414e-bd0b-ed5178d9aeb5',
        name: 'Conference Room 1',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 10,
        permanently_reserved: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '6b3a2aa4-27e9-459d-bd77-9b1ac37e7e2f',
        type_id: '07c0865e-f27c-414e-bd0b-ed5178d9aeb5',
        name: 'Conference Room 2',
        area_id: '43b38b33-143e-4acd-84ac-f8108a279589',
        participant_limit: 5,
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
