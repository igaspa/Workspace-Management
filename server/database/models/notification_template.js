'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notificationTemplate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  notificationTemplate.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false
    },
    name: DataTypes.STRING,
    template: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'notificationTemplate',
    tableName: 'notification_template',
    paranoid: true
  });
  return notificationTemplate;
};
