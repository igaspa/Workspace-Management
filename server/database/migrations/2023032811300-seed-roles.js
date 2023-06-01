/* eslint-disable quotes */
'use strict';
const { tableName } = require('../../utils/constants');
const { role } = require('../models');
const { roles } = require('../../utils/roles');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const { sequelize } = queryInterface;
    return sequelize.transaction(async (transaction) => {
      const roleNames = ['Administrator', 'Lead', 'Employee', 'Tablet'];

      return Promise.all(
        roleNames.map(function (roleName) {
          return role.create({ name: roleName }, { transaction });
        })
      );
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(tableName.role, null, {});
  }
};
