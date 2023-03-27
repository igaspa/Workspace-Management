'use strict';
const { schemeName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('area', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      location_id: {
        allowNull: false,
        type: Sequelize.UUID
      },
      floor: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },
  async down (queryInterface, _Sequelize) {
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS ${schemeName}.area;`);
  }
};
