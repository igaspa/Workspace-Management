'use strict';
const { v4: uuidv4 } = require('uuid');

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  role.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID
      },
      name: DataTypes.STRING
    },
    {
      hooks: {
        beforeCreate: async (model) => {
          model.id = uuidv4();
        }
      },
      sequelize,
      modelName: 'role',
      timestamps: false
    }
  );
  return role;
};
