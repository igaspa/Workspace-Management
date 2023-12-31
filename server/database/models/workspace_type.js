'use strict';
const withInterval = require('sequelize-interval-postgres');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const AdditDataTypes = withInterval(DataTypes);

  class workspaceType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  workspaceType.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    allowPermanentReservations: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    allowMultipleParticipants: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    maxReservationInterval: AdditDataTypes.INTERVAL,
    maxReservationWindow: AdditDataTypes.INTERVAL
  }, {
    sequelize,
    modelName: 'workspaceType',
    tableName: 'workspace_type',
    paranoid: true
  });
  return workspaceType;
};
