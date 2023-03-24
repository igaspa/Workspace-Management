'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  location.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async (model) => {
        model.id = uuidv4();
      }
    },
    sequelize,
    modelName: 'location'
  });
  return location;
};
