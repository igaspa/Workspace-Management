'use strict';
const withInterval = require('sequelize-interval-postgres');
const { schemeName } = require('../../utils/constants');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const SequelizeType = withInterval(Sequelize);
    await queryInterface.createTable('working_space_type', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      reservation_time: {
        allowNull: false,
        type: SequelizeType.INTERVAL
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
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS ${schemeName}.working_space_type;`);
  }
};
