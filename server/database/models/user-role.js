'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      models.user.belongsToMany(models.role, {
        through: userRole,
        foreignKey: 'userId'
      });
      models.role.belongsToMany(models.user, {
        through: userRole,
        foreignKey: 'roleId'
      });
    }
  }
  userRole.init({
    roleId: DataTypes.UUID,
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'userRole',
    tableName: 'user_role',
    timestamps: false
  });
  return userRole;
};
