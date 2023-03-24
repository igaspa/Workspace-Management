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
      notification.belongsTo(models.notification_template, { foreignKey: 'notificationTemplateId' });
      models.notification_template.hasMany(notification, { foreignKey: 'notificationTemplateId' });
    }
  }
  notification.init({
    id: DataTypes.UUID,
    notificationTemplateId: DataTypes.UUID,
    reservationId: DataTypes.UUID,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'notification',
    paranoid: true
  });
  return notification;
};
