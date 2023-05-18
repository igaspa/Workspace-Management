'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName.workspaceEquipment, {
      equipment_id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true
      },
      workspace_id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      }
    });
  },
  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable(tableName.workspaceEquipment);
  }
};
