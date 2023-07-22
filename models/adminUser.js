'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdminUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AdminUser.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[0-9a-zA-Z]{64}$/i,
        min: 6
      }
    },
    role: {
      type: DataTypes.JSON,
      defaultValue: 'basic',
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'AdminUser',
  });
  return User;
};