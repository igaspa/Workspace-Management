'use strict';
const { tableName, constraintName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.addConstraint(tableName.notification, {
      fields: ['notification_template_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      name: constraintName.notificationTemplate,
      type: 'foreign key',
      references: {
        table: tableName.notificationTemplate,
        field: 'id'
      }
    });
    await queryInterface.addConstraint(tableName.notification, {
      fields: ['reservation_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      name: constraintName.notificationReservation,
      type: 'foreign key',
      references: {
        table: tableName.reservation,
        field: 'id'
      }
    });
    await queryInterface.addConstraint(tableName.reservation, {
      fields: ['user_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      name: constraintName.reservationUser,
      type: 'foreign key',
      references: {
        table: tableName.user,
        field: 'id'
      }
    });

    await queryInterface.addConstraint(tableName.reservation, {
      fields: ['workspace_id'],
      type: 'foreign key',
      onDelete: 'cascade',
      onUpdate: 'cascade',
      name: constraintName.reservationWorkspace,
      references: {
        table: tableName.workspace,
        field: 'id'
      }
    });

    await queryInterface.addConstraint(tableName.workspace, {
      fields: ['type_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      name: constraintName.workspaceType,
      type: 'foreign key',
      references: {
        table: tableName.workspaceType,
        field: 'id'
      }
    });
    await queryInterface.addConstraint(tableName.workspace, {
      fields: ['area_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      name: constraintName.workspaceArea,
      type: 'foreign key',
      references: {
        table: tableName.area,
        field: 'id'
      }
    });
    await queryInterface.addConstraint(tableName.area, {
      fields: ['location_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      name: constraintName.areaLocation,
      type: 'foreign key',
      references: {
        table: tableName.location,
        field: 'id'
      }
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.removeConstraint(tableName.notification, constraintName.notificationTemplate);
    await queryInterface.removeConstraint(tableName.notification, constraintName.notificationReservation);
    await queryInterface.removeConstraint(tableName.reservation, constraintName.reservationUser);
    await queryInterface.removeConstraint(tableName.reservation, constraintName.reservationWorkspace);
    await queryInterface.removeConstraint(tableName.workspace, constraintName.workspaceType);
    await queryInterface.removeConstraint(tableName.workspace, constraintName.workspaceArea);
    await queryInterface.removeConstraint(tableName.area, constraintName.areaLocation);
  }
};
