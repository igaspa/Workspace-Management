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
      workingSpace.belongsTo(models.workingSpaceType, { foreignKey: 'typeId' });
      models.workingSpaceType.hasMany(workingSpace, { foreignKey: 'typeId' });

      workingSpace.belongsTo(models.area, { foreignKey: 'areaId' });
      models.area.hasMany(workingSpace, { foreignKey: 'areaId' });
    }
  }
  workingSpace.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    permanentlyReserved: DataTypes.BOOLEAN,
    typeId: DataTypes.INTEGER,
    areaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'workingSpace',
    tableName: 'working_space',
    paranoid: true
  });
  return workingSpace;
};
