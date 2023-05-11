'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class workspace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      workspace.belongsTo(models.workspaceType, { foreignKey: 'typeId' });
      models.workspaceType.hasMany(workspace, { foreignKey: 'typeId' });

      workspace.belongsTo(models.area, { foreignKey: 'areaId' });
      models.area.hasMany(workspace, { foreignKey: 'areaId' });
    }
  }
  workspace.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: {
      type: DataTypes.STRING
    },
    permanentlyReserved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    typeId: DataTypes.INTEGER,
    areaId: DataTypes.INTEGER
  }, {
    sequelize,
    indexes: [
      {
        unique: true,
        fields: ['name', 'areaId']
      }
    ],
    modelName: 'workspace',
    tableName: 'workspace',
    paranoid: true
  });
  return workspace;
};
