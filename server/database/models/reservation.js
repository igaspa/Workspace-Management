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
    userId: DataTypes.UUID,
    workspaceId: DataTypes.INTEGER,
    reservationStart: DataTypes.DATE,
    reservationEnd: DataTypes.DATE,
    participants: DataTypes.JSONB,
    actionId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'reservation',
    indexes: [
      {
        unique: true,
        fields: ['reservationStart', 'workspaceId']
      }
    ]
  });
  return reservation;
};
