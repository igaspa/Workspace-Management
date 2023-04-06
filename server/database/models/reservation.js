'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      models.user.belongsToMany(models.workspace, {
        through: reservation,
        foreignKey: 'userId'
      });
      models.workspace.belongsToMany(models.user, {
        through: reservation,
        foreignKey: 'workspaceId'
      });
    }
  }
  reservation.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    workspaceId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    reservation_start: {
      allowNull: false,
      type: DataTypes.DATE
    },
    reservation_end: {
      allowNull: true,
      type: DataTypes.DATE
    },
    participants: {
      allowNull: true,
      type: DataTypes.JSONB
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'reservation'
  });
  return reservation;
};
