'use strict';
const withInterval = require('sequelize-interval-postgres');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const AdditDataTypes = withInterval(DataTypes);

  class workingSpaceType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  workingSpaceType.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: DataTypes.STRING,
    reservationTime: AdditDataTypes.INTERVAL
  }, {
    sequelize,
    modelName: 'workingSpaceType',
    tableName: 'working_space_type',
    paranoid: true
  });
  return workingSpaceType;
};
