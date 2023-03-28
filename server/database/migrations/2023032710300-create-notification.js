'use strict';
const { schemeName, notificationStatus } = require('../../utils/constants');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('notification', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      notification_template_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      reservation_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS ${schemeName}.notification;`);
  }
};
