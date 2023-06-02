'use strict';
const { user, role, userRole } = require('../models');
const { roles } = require('../../utils/roles');
const { ADMIN } = require('../seed-data/users');

module.exports = {
  async up(queryInterface) {
    const { sequelize } = queryInterface;
    return sequelize.transaction(async (transaction) => {
      const adminRole = await role.findOne({ where: { name: roles.administrator } }, { transaction });
      const adminUser = await user.create(ADMIN, { transaction });

      return userRole.create({ roleId: adminRole.id, userId: adminUser.id }, { transaction });
    });
  },
  async down(queryInterface) {
    const { sequelize } = queryInterface;
    return sequelize.transaction(async (transaction) => {
      const admin = await user.findOne({ where: { email: ADMIN.email } }, { transaction });

      await userRole.destroy({ where: { userId: admin.id } }, { transaction });
      return admin.destroy({ transaction });
    });
  }
};
