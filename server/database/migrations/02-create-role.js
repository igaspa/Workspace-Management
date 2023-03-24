'use strict';
const { schemeName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('role', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      }
    }, {
      schema: schemeName
    });
  },
  async down (queryInterface, _Sequelize) {
    await queryInterface.sequelize.query(`DROP TABLE ${schemeName}.role;`);
  }
};
