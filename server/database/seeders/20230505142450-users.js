'use strict';
const { tableName } = require('../../utils/constants');
const { user, role, userRole } = require('../models');
const { roles } = require('../../utils/roles');
const { EMPLOYEES, LEADS, TABLETS } = require('../seed-data/users');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const { sequelize } = queryInterface;
    return sequelize.transaction(async (transaction) => {
      const employeeRole = await role.findOne({ where: { name: roles.employee } }, { transaction });
      const leadRole = await role.findOne({ where: { name: roles.lead } }, { transaction });
      const tabletRole = await role.findOne({ where: { name: roles.tablet } }, { transaction });

      const employees = EMPLOYEES.map(mapUser);
      const leads = LEADS.map(mapUser);
      const tablets = TABLETS.map(mapUser);
      await user.bulkCreate([...employees, ...leads, ...tablets], { transaction });

      const employeeUserRoles = employees.map((employee) => mapUserRole(employee, employeeRole));
      const leadUserRoles = leads.map((lead) => mapUserRole(lead, leadRole));
      const tabletUserRoles = tablets.map((tablet) => mapUserRole(tablet, tabletRole));

      const userRoles = [...employeeUserRoles, ...leadUserRoles, ...tabletUserRoles];
      return userRole.bulkCreate(userRoles, { transaction });
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(tableName.user, null, {});
  }
};

const mapUser = (user) => {
  return {
    id: uuidv4(),
    ...user
  };
};

const mapUserRole = (user, role) => {
  return {
    id: uuidv4(),
    roleId: role.id,
    userId: user.id
  };
};
