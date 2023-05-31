'use strict';
const { user, role, userRole } = require('../models');
const { roles } = require('../../utils/roles');

const ADMIN_PASSWORD = 'test1234';
const ADMIN_EMAIL = 'admin@example.com';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    const { sequelize } = queryInterface;
    return sequelize.transaction(async transaction => {
      const adminRole = await role.findOne(
        { where: { name: roles.administrator } },
        { transaction }
      );

      const adminUser = await user.create({
        firstName: 'Admin',
        lastName: 'User',
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        phoneNumber: '+15055555555'
      }, { transaction });

      return userRole.create(
        { roleId: adminRole.id, userId: adminUser.id },
        { transaction }
      );
    });
  },
  async down (queryInterface) {
    const { sequelize } = queryInterface;
    return sequelize.transaction(async transaction => {
      const admin = await user.findOne(
        { where: { email: ADMIN_EMAIL } },
        { transaction }
      );

      await userRole.destroy(
        { where: { userId: admin.id } },
        { transaction }
      );
      return admin.destroy({ transaction });
    });
  }
};
