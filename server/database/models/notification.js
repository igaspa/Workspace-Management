'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      notification.belongsTo(models.notificationTemplate, { foreignKey: 'notificationTemplateId' });
      models.notificationTemplate.hasMany(notification, { foreignKey: 'notificationTemplateId' });

      notification.belongsTo(models.reservation, { foreignKey: 'reservationId' });
      models.reservation.hasMany(notification, { foreignKey: 'reservationId' });
    }
  }
  notification.init({
    notificationTemplateId: DataTypes.UUID,
    reservationId: DataTypes.UUID,
    status: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'notification',
    paranoid: true
  });
  return notification;
};
