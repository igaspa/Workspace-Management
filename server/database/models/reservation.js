/* eslint-disable max-len */
'use strict';
const {
  Model
} = require('sequelize');
const { calculateStartDate, calculateEndDate } = require('../../utils/date-calculation');
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

      models.user.hasMany(reservation);
      reservation.belongsTo(models.user);
      models.workspace.hasMany(reservation);
      reservation.belongsTo(models.workspace);
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
    startAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    endAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    dateTime: {
      type: DataTypes.VIRTUAL,
      get () {
        const startAt = calculateStartDate(this.startAt);
        const endAt = this.endAt ? calculateEndDate(this.endAt) : 'PERMANENT';
        return `${startAt} - ${endAt}`;
      }
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
    modelName: 'reservation',
    paranoid: true 
  });
  return reservation;
};
