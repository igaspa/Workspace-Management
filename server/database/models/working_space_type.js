'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class workingSpaceType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  workingSpaceType.init({
    name: DataTypes.STRING,
    reservationTime: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'workingSpaceType',
    paranoid: true
  });
  return workingSpaceType;
};
