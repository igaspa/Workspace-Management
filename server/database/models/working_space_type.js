'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class working_space_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  working_space_type.init({
    name: DataTypes.STRING,
    reservation_time: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'working_space_type',
    paranoid: true
  });
  return working_space_type;
};
