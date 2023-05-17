'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class workspaceEquipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      models.equipment.belongsToMany(models.workspace, {
        through: workspaceEquipment,
        foreignKey: 'equipmentId'
      });
      models.workspace.belongsToMany(models.equipment, {
        through: workspaceEquipment,
        foreignKey: 'workspaceId'
      });
    }
  }
  workspaceEquipment.init({
    equipmentId: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false
    },
    workspaceId: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false
    },
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'workspaceEquipment',
    tableName: 'workspace_equipment',
    timestamps: false
  });
  return workspaceEquipment;
};
