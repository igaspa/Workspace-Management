/* eslint-disable quotes */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('role', [
      {
        id: 'd2477f3b-d4ce-4269-9221-0ad479fd45ad',
        name: 'Administrator'
      },
      {
        id: 'c40910c3-c2cf-439f-8d5b-be62d7c548be',
        name: 'Employee'
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('role', null, {});
  }
};
