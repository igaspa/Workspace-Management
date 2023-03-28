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
    name: DataTypes.STRING,
    template: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'notificationTemplate',
    paranoid: true
  });
  return notificationTemplate;
};
