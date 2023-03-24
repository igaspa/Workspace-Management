'use strict';
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
      schema: 'table_management'
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('role');
  }
};
