'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class workingSpace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      working_space.belongsTo(models.working_space_type, { foreignKey: 'typeId' });
      models.working_space_type.hasMany(working_space, { foreignKey: 'typeId' });

      working_space.belongsTo(models.area, { foreignKey: 'areaId' });
      models.area.hasMany(working_space, { foreignKey: 'areaId' });
    }
  }
  workingSpace.init({
    name: DataTypes.STRING,
    permanentlyReserved: DataTypes.BOOLEAN,
    typeId: DataTypes.INTEGER,
    areaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'workingSpace',
    paranoid: true
  });
  return workingSpace;
};
