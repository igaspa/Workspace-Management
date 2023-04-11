'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName.userRole, {
      role_id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true
      }
    });
  },
  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable(tableName.userRole);
  }
};
