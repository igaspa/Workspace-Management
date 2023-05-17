'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert(tableName.userRole, [
      {
        user_id: 'ffa719ce-bd7b-4190-97f5-03b92dc4cb2c',
        role_id: 'c40910c3-c2cf-439f-8d5b-be62d7c548be'
      },
      {
        user_id: 'f832b0e2-dfea-4cd3-ba5c-d409dea288ef',
        role_id: 'c40910c3-c2cf-439f-8d5b-be62d7c548be'
      },
      {
        user_id: '4f0c74c2-149e-4f04-bf22-dd1bfc5620f0',
        role_id: 'c40910c3-c2cf-439f-8d5b-be62d7c548be'
      },
      {
        user_id: 'eeb12663-d06c-493f-8434-5646c0816d4c',
        role_id: 'c40910c3-c2cf-439f-8d5b-be62d7c548be'
      },
      {
        user_id: '4610883e-7dec-412f-8a7e-b7e1dc05d152',
        role_id: 'c40910c3-c2cf-439f-8d5b-be62d7c548be'
      },
      {
        user_id: '89a59efb-d321-431b-8107-5978c53c830b',
        role_id: 'c40910c3-c2cf-439f-8d5b-be62d7c548be'
      },
      {
        user_id: 'cb81efd2-05a4-4d9b-9ca5-2bbb6851c2e2',
        role_id: 'c40910c3-c2cf-439f-8d5b-be62d7c548be'
      },
      {
        user_id: '05f306f4-ab8f-498f-b6bd-dc340487d226',
        role_id: 'c40910c3-c2cf-439f-8d5b-be62d7c548be'
      },
      {
        user_id: 'd8e5b29b-6483-4202-98e0-c8d401770939',
        role_id: 'c40910c3-c2cf-439f-8d5b-be62d7c548be'
      },
      {
        user_id: '94381af7-29aa-438c-b789-f393dbea0ade',
        role_id: '0bdd577d-c8e5-4973-a6e3-6cf806d8a601'
      },
      {
        user_id: 'dfe21849-527f-41ee-929c-fafecaf41eec',
        role_id: '0bdd577d-c8e5-4973-a6e3-6cf806d8a601'
      },
      {
        user_id: '68ea2f1d-b812-4c04-9065-e9e3a58a0633',
        role_id: '0bdd577d-c8e5-4973-a6e3-6cf806d8a601'
      },
      {
        user_id: '1a69ef28-8eb8-418c-8869-d6322a513102',
        role_id: '0bdd577d-c8e5-4973-a6e3-6cf806d8a601'
      },
      {
        user_id: 'f22c887a-8a7f-426b-839f-e2e9a68738e1',
        role_id: '0bdd577d-c8e5-4973-a6e3-6cf806d8a601'
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(tableName.userRole, null, {});
  }
};
