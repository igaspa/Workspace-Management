'use strict';
const { schemeName } = require('../../utils/constants');

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.createSchema(schemeName);
  },

  down: async (_queryInterface, _Sequelize) => {
  }
};
