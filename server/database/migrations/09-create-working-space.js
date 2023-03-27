'use strict';
const { schemeName } = require('../../utils/constants');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('working_space', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      participants: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.JSONB
      },
      permanently_reserved: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      type_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      area_id: {
        allowNull: false,
        type: Sequelize.UUID
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
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS ${schemeName}.working_space;`);
  }
};
