'use strict';
const { tableName, notificationStatus } = require('../../utils/constants');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(tableName.notification, {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      notification_template_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      data: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM,
        values: [notificationStatus.sent, notificationStatus.failed],
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
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable(tableName.notification);
  }
};
