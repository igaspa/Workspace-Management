'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert(tableName.area, [
      {
        id: '26bae8e2-50fd-41cd-8b29-d1bf2a5becd2',
        name: 'East Wing',
        location_id: '5419ce7d-c415-480d-a980-cd169559bc85',
        floor: 'First Floor',
        image: 'https://drive.google.com/uc?id=1Z5CBJ8I0Q6s_nM2Lfax95zj8vQiGgUf6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '43b38b33-143e-4acd-84ac-f8108a279589',
        name: 'West Wing',
        location_id: '5419ce7d-c415-480d-a980-cd169559bc85',
        floor: 'First Floor',
        image: 'https://drive.google.com/uc?id=1wt0xNQGs4Ud5vi37oiJqEZIOgXuyy4kq',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '1b880839-990c-4798-9f2d-dfe7b64b23cf',
        name: 'Third Floor',
        location_id: '5419ce7d-c415-480d-a980-cd169559bc85',
        floor: 'Third Floor',
        image: 'https://drive.google.com/uc?id=1v0m6_cdwT4DqUehUiA7s-rCLuDUJ7yjh',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(tableName.area, null, {});
  }
};
