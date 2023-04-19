/* eslint-disable quotes */
'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert(tableName.role, [
      {
        id: 'd2477f3b-d4ce-4269-9221-0ad479fd45ad',
        name: 'Administrator'
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(tableName.role, null, {});
  }
};
