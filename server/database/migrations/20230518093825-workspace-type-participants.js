'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('workspace_type', 'participant_limit', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 1
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.removeColumn(tableName.workspaceType, 'participant_limit');
  }
};
