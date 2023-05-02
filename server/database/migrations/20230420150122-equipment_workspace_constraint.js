'use strict';
const { tableName, constraintName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.addConstraint(tableName.workspaceEquipment, {
      fields: ['equipment_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      name: constraintName.equipmentWorkspace,
      type: 'foreign key',
      references: {
        table: 'equipment',
        field: 'id'
      }
    });

    await queryInterface.addConstraint(tableName.workspaceEquipment, {
      fields: ['workspace_id'],
      type: 'foreign key',
      onDelete: 'cascade',
      onUpdate: 'cascade',
      name: constraintName.workspaceEquipment,
      references: {
        table: 'workspace',
        field: 'id'
      }
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.removeConstraint(tableName.workspaceEquipment, constraintName.equipmentWorkspace);
    await queryInterface.removeConstraint(tableName.workspaceEquipment, constraintName.workspaceEquipment);
  }
};
