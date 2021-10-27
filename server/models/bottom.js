'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bottom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  bottom.init({
    bottom_name: DataTypes.STRING,
    bottom_photo: DataTypes.STRING,
    gender: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bottom',
  });
  return bottom;
};