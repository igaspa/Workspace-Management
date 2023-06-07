'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(_models) {}
  }
  user.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      phoneNumber: DataTypes.STRING,
      token: {
        type: DataTypes.STRING,
        allowNull: true
      },
      tokenExpirationTime: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      hooks: {
        beforeCreate: async (model) => {
          model.id = uuidv4();
        }
      },
      sequelize,
      modelName: 'user',
      paranoid: true
    }
  );
  return user;
};
