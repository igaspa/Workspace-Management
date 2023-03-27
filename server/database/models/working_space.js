'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class working_space extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  working_space.init({
    name: DataTypes.STRING,
    participants: DataTypes.JSONB,
    permanentlyReserved: DataTypes.BOOLEAN,
    typeId: DataTypes.INTEGER,
    areaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'working_space',
    paranoid: true
  });
  return working_space;
};
