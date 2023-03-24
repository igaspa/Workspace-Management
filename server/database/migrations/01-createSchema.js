'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createSchema('table_management');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropSchema('table_management');
  }
};
