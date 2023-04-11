'use strict';
const { tableName, constraintName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.addConstraint(tableName.userRole, {
      fields: ['user_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      name: constraintName.roleUser,
      type: 'foreign key',
      references: {
        table: 'user',
        field: 'id'
      }
    });

    await queryInterface.addConstraint(tableName.userRole, {
      fields: ['role_id'],
      type: 'foreign key',
      onDelete: 'cascade',
      onUpdate: 'cascade',
      name: constraintName.userRole,
      references: {
        table: 'role',
        field: 'id'
      }
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.removeConstraint(tableName.userRole, constraintName.userRole);
    await queryInterface.removeConstraint(tableName.userRole, constraintName.roleUser);
  }
};
