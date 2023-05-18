'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert(tableName.user, [
      {
        id: 'ffa719ce-bd7b-4190-97f5-03b92dc4cb2c',
        first_name: 'Ivana',
        last_name: 'Gasparov',
        email: 'ivana.gasparov@agilathon.com',
        password: '$2b$10$He0zyaPjngh35c.Bgp.nhOn85Et0bnIgr5AUcZ1/40xbnP8V/uvDK',
        phone_number: '+15055555555',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'f832b0e2-dfea-4cd3-ba5c-d409dea288ef',
        first_name: 'Lovre',
        last_name: 'Begovic',
        email: 'lovre.begovic@agilathon.com',
        phone_number: '+15055555555',
        password: '$2b$10$He0zyaPjngh35c.Bgp.nhOn85Et0bnIgr5AUcZ1/40xbnP8V/uvDK',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '4f0c74c2-149e-4f04-bf22-dd1bfc5620f0',
        first_name: 'Goran',
        last_name: 'Stajduhar',
        email: 'goran.stajduhar@agilathon.com',
        phone_number: '+15055555555',
        password: '$2b$10$He0zyaPjngh35c.Bgp.nhOn85Et0bnIgr5AUcZ1/40xbnP8V/uvDK',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'eeb12663-d06c-493f-8434-5646c0816d4c',
        first_name: 'Ivana',
        last_name: 'Burazin',
        email: 'ivana.burazin@agilathon.com',
        phone_number: '+15055555555',
        password: '$2b$10$He0zyaPjngh35c.Bgp.nhOn85Et0bnIgr5AUcZ1/40xbnP8V/uvDK',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '4610883e-7dec-412f-8a7e-b7e1dc05d152',
        first_name: 'Karlo',
        last_name: 'Dujmic',
        email: 'karlo.dujumic@agilathon.com',
        phone_number: '+15055555555',
        password: '$2b$10$He0zyaPjngh35c.Bgp.nhOn85Et0bnIgr5AUcZ1/40xbnP8V/uvDK',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '89a59efb-d321-431b-8107-5978c53c830b',
        first_name: 'Lucija',
        last_name: 'Bilic',
        email: 'lucija.bilic@agilathon.com',
        phone_number: '+15055555555',
        password: '$2b$10$He0zyaPjngh35c.Bgp.nhOn85Et0bnIgr5AUcZ1/40xbnP8V/uvDK',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'cb81efd2-05a4-4d9b-9ca5-2bbb6851c2e2',
        first_name: 'Lucija',
        last_name: 'Banek',
        email: 'lucija.banek@agilathon.com',
        phone_number: '+15055555555',
        password: '$2b$10$He0zyaPjngh35c.Bgp.nhOn85Et0bnIgr5AUcZ1/40xbnP8V/uvDK',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '05f306f4-ab8f-498f-b6bd-dc340487d226',
        first_name: 'Josip',
        last_name: 'Bogunovic',
        email: 'josip.bogunovic@agilathon.com',
        phone_number: '+15055555555',
        password: '$2b$10$He0zyaPjngh35c.Bgp.nhOn85Et0bnIgr5AUcZ1/40xbnP8V/uvDK',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'd8e5b29b-6483-4202-98e0-c8d401770939',
        first_name: 'Marko',
        last_name: 'Vukusic',
        email: 'marko.vukusic@agilathon.com',
        phone_number: '+15055555555',
        password: '$2b$10$He0zyaPjngh35c.Bgp.nhOn85Et0bnIgr5AUcZ1/40xbnP8V/uvDK',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '94381af7-29aa-438c-b789-f393dbea0ade',
        first_name: 'Toni',
        last_name: 'Erceg',
        email: 'toni.erceg@agilathon.com',
        phone_number: '+15055555555',
        password: '$2b$10$He0zyaPjngh35c.Bgp.nhOn85Et0bnIgr5AUcZ1/40xbnP8V/uvDK',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'dfe21849-527f-41ee-929c-fafecaf41eec',
        first_name: 'Hrvoje',
        last_name: 'Odak',
        email: 'hrvoje.odak@agilathon.com',
        phone_number: '+15055555555',
        password: '$2b$10$He0zyaPjngh35c.Bgp.nhOn85Et0bnIgr5AUcZ1/40xbnP8V/uvDK',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '68ea2f1d-b812-4c04-9065-e9e3a58a0633',
        first_name: 'Ivan',
        last_name: 'Zec',
        email: 'ivan.zec@agilathon.com',
        phone_number: '+15055555555',
        password: '$2b$10$He0zyaPjngh35c.Bgp.nhOn85Et0bnIgr5AUcZ1/40xbnP8V/uvDK',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '1a69ef28-8eb8-418c-8869-d6322a513102',
        first_name: 'Tonci',
        last_name: 'Kucic',
        email: 'tonci.kucic@agilathon.com',
        phone_number: '+15055555555',
        password: '$2b$10$He0zyaPjngh35c.Bgp.nhOn85Et0bnIgr5AUcZ1/40xbnP8V/uvDK',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'f22c887a-8a7f-426b-839f-e2e9a68738e1',
        first_name: 'Marko',
        last_name: 'Ivanovic',
        email: 'marko.ivanovic@agilathon.com',
        phone_number: '+15055555555',
        password: '$2b$10$He0zyaPjngh35c.Bgp.nhOn85Et0bnIgr5AUcZ1/40xbnP8V/uvDK',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(tableName.user, null, {});
  }
};
