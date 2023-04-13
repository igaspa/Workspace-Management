'use strict';
const {
  Model
} = require('sequelize');
const { notificationStatus } = require('../../utils/constants');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      models.notificationTemplate.belongsToMany(models.reservation, {
        through: notification,
        foreignKey: 'notificationTemplateId'
      });
      models.reservation.belongsToMany(models.notificationTemplate, {
        through: notification,
        foreignKey: 'reservationId'
      });
    }
  }
  notification.init({
    notificationTemplateId: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false
    },
    reservationId: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false
    },
    status: DataTypes.ENUM(notificationStatus.sent, notificationStatus.failed),
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'notification',
    paranoid: true
  });
  return notification;
};
