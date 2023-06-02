'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName.role, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      }
    });
  },
  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable(tableName.role);
  }
};
