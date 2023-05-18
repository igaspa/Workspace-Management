'use strict';
const { schemaName } = require('../../utils/constants');

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.createSchema(schemaName);
  },

  down: async (_queryInterface, _Sequelize) => {
  }
};
