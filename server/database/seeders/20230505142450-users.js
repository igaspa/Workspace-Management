'use strict';
const { tableName } = require('../../utils/constants');
const { user, role, userRole } = require('../models');
const { roles } = require('../../utils/roles');
const { EMPLOYEES, LEADS } = require('../seed-data/users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const { sequelize } = queryInterface;
    return sequelize.transaction(async (transaction) => {
      const leadRole = await role.findOne({ where: { name: roles.lead } }, { transaction });
      const employeeRole = await role.findOne({ where: { name: roles.employee } }, { transaction });

      const employees = await Promise.all(
        EMPLOYEES.map(function (employee) {
          return user.create(employee, { transaction });
        })
      );

      const leads = await Promise.all(
        LEADS.map(function (lead) {
          return user.create(lead, { transaction });
        })
      );

      const employeeUserRoles = employees.map((employee) => {
        return {
          roleId: employeeRole.id,
          userId: employee.id
        };
      });

      const leadUserRoles = leads.map((lead) => {
        return {
          roleId: leadRole.id,
          userId: lead.id
        };
      });

      return Promise.all(
        [...employeeUserRoles, ...leadUserRoles].map(function (userRoleObject) {
          return userRole.create(userRoleObject, { transaction });
        })
      );
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(tableName.user, null, {});
  }
};
