'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_role', {
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
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_role');
  }
};
