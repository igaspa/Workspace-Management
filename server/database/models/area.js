'use strict';

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
      area.belongsTo(models.location, { foreignKey: 'locationId', hooks: true });
      models.location.hasMany(area, { foreignKey: 'locationId', hooks: true, onDelete: 'cascade' });
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
    sequelize,
    modelName: 'area',
    tableName: 'area',
    paranoid: true
  });
  return area;
};
