'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE EXTENSION IF NOT EXISTS btree_gist;

      CREATE TABLE reservation (
        id UUID PRIMARY KEY NOT NULL,
        user_id UUID NOT NULL,
        workspace_id UUID NOT NULL,
        start_at TIMESTAMPTZ NOT NULL,
        end_at TIMESTAMPTZ,
        participants JSONB DEFAULT NULL,
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL
      );

      ALTER TABLE reservation ADD CONSTRAINT overlapping_reservation 
      EXCLUDE USING gist (workspace_id WITH =, tstzrange(start_at, end_at) WITH &&);

    `);
  },
  async down (queryInterface, _Sequelize) {
    await queryInterface.removeConstraint(tableName.reservation, 'overlapping_reservation');
    await queryInterface.dropTable(tableName.reservation);
  }
};
