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
      // define association here
    }
  }
  reservation.init({
    id: DataTypes.UUID,
    userId: DataTypes.UUID,
    workingSpaceId: DataTypes.INTEGER,
    reservationStart: DataTypes.DATE,
    reservationEnd: DataTypes.DATE,
    participants: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'reservation'
  });
  return reservation;
};
