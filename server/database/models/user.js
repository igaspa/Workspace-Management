'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      user.belongsTo(models.role, { foreignKey: 'roleId' });
      models.role.hasMany(user, { foreignKey: 'roleId' });
    }
  }
  user.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    roleId: DataTypes.UUID
  }, {
    hooks: {
      beforeCreate: async (model) => {
        model.id = uuidv4();
      }
    },
    sequelize,
    modelName: 'user',
    paranoid: true
  });
  return user;
};
