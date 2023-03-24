'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification_template extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  notification_template.init({
    name: DataTypes.STRING,
    template: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'notification_template',
    paranoid: true
  });
  return notification_template;
};
