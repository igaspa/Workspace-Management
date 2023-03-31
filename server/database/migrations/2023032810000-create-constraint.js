'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('notification', {
      fields: ['notification_template_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      name: 'notification_template',
      type: 'foreign key',
      references: {
        table: 'notification_template',
        field: 'id'
      }
    });
    await queryInterface.addConstraint('notification', {
      fields: ['reservation_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      name: 'notification_reservation',
      type: 'foreign key',
      references: {
        table: 'reservation',
        field: 'id'
      }
    });
    await queryInterface.addConstraint('reservation', {
      fields: ['user_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      name: 'reservation_user',
      type: 'foreign key',
      references: {
        table: 'user',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('reservation', {
      fields: ['working_space_id'],
      type: 'foreign key',
      onDelete: 'cascade',
      onUpdate: 'cascade',
      name: 'reservation_working_space',
      references: {
        table: 'working_space',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('working_space', {
      fields: ['type_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      name: 'working_space_type',
      type: 'foreign key',
      references: {
        table: 'working_space_type',
        field: 'id'
      }
    });
    await queryInterface.addConstraint('working_space', {
      fields: ['area_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      name: 'working_space_area',
      type: 'foreign key',
      references: {
        table: 'area',
        field: 'id'
      }
    });
    await queryInterface.addConstraint('area', {
      fields: ['location_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      name: 'area_location',
      type: 'foreign key',
      references: {
        table: 'location',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('notification', 'notification_template');
    await queryInterface.removeConstraint('notification', 'notification_reservation');
    await queryInterface.removeConstraint('reservation', 'reservation_user');
    await queryInterface.removeConstraint('reservation', 'reservation_working_space');
    await queryInterface.removeConstraint('working_space', 'working_space_type');
    await queryInterface.removeConstraint('working_space', 'working_space_area');
    await queryInterface.removeConstraint('area', 'area_location');
  }
};
