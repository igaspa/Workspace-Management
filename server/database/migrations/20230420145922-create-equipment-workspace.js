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
      equipment_quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable(tableName.workspaceEquipment);
  }
};
