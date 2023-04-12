'use strict';
const { tableName, notificationStatus } = require('../../utils/constants');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName.notification, {
      notification_template_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      reservation_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      status: {
        type: Sequelize.STRING,
        enum: notificationStatus,
        allowNull: false
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
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
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(tableName.notification);
  }
};
