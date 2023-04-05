'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName.reservation, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID
      },
      workspace_id: {
        allowNull: false,
        type: Sequelize.UUID
      },
      action_id: {
        allowNull: false,
        type: Sequelize.UUID
      },
      reservation_start: {
        allowNull: false,
        type: Sequelize.DATE
      },
      reservation_end: {
        allowNull: true,
        type: Sequelize.DATE
      },
      participants: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.JSONB
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      uniqueKeys: {
        Items_unique: {
          fields: ['workspace_id', 'reservation_start']
        }
      }
    });
  },
  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable(tableName.reservation);
  }
};
