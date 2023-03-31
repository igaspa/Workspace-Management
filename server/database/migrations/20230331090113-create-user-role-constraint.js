'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('user_role', {
      fields: ['user_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      name: 'user_userRole',
      type: 'foreign key',
      references: {
        table: 'user',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('user_role', {
      fields: ['role_id'],
      type: 'foreign key',
      onDelete: 'cascade',
      onUpdate: 'cascade',
      name: 'role_userRole',
      references: {
        table: 'role',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('user_role', 'user_userRole');
    await queryInterface.removeConstraint('user_role', 'role_userRole');
  }
};
