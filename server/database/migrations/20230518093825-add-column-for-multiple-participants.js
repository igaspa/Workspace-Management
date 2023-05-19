'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('workspace_type', 'allow_multiple_participants', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
    await queryInterface.addColumn('workspace', 'participant_limit', {
      type: Sequelize.INTEGER,
      defaultValue: 1
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.removeColumn(tableName.workspaceType, 'allow_multiple_participants');
    await queryInterface.removeColumn(tableName.workspace, 'participant_limit');
  }
};
