'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      area.belongsTo(models.location, { foreignKey: 'locationId' });
      models.location.hasMany(area, { foreignKey: 'locationId' });
    }
  }
  area.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    locationId: DataTypes.UUID,
    floor: DataTypes.STRING,
    image: DataTypes.STRING
  }, {

    hooks: {
      beforeCreate: async (model) => {
        model.id = uuidv4();
      }
    },
    sequelize,
    modelName: 'area',
    paranoid: true
  });
  return area;
};
