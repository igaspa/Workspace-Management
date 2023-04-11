/* eslint-disable quotes */
'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert(tableName.userRole, [
      {
        role_id: 'd2477f3b-d4ce-4269-9221-0ad479fd45ad',
        user_id: '47f6daa2-a1ed-495a-ba55-c626b4366c5e'
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(tableName.userRole, null, {});
  }
};
