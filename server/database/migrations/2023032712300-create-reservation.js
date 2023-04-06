'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS btree_gist;');

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
    });

    await queryInterface.sequelize.query(`
    ALTER TABLE ${tableName.reservation}
    ADD CONSTRAINT overlapping_reservation 
    EXCLUDE USING gist (workspace_id WITH =, tsrange(reservation_start, reservation_end) WITH &&);
  `);
  },
  async down (queryInterface, _Sequelize) {
    await queryInterface.removeConstraint(tableName.reservation, 'overlapping_reservation');
    await queryInterface.dropTable(tableName.reservation);
  }
};
