'use strict';
const withInterval = require('sequelize-interval-postgres');
const { tableName } = require('../../utils/constants');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const SequelizeType = withInterval(Sequelize);
    await queryInterface.createTable(tableName.workspaceType, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      max_reservation_interval: {
        allowNull: true,
        type: SequelizeType.INTERVAL
      },
      max_reservation_window: {
        allowNull: true,
        type: SequelizeType.INTERVAL
      },
      allow_permanent_reservations: {
        allowNull: false,
        type: SequelizeType.BOOLEAN
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
  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable(tableName.workspaceType);
  }
};
