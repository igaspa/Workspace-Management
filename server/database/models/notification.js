'use strict';
const { Model } = require('sequelize');
const { notificationStatus } = require('../../utils/constants');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  notification.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID
      },
      notificationTemplateId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      data: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      status: DataTypes.ENUM(notificationStatus.sent, notificationStatus.failed),
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'notification',
      paranoid: true
    }
  );
  return notification;
};
