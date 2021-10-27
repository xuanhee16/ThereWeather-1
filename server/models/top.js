'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class top extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  top.init({
    top_name: DataTypes.STRING,
    top_photo: DataTypes.STRING,
    gender: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'top',
  });
  return top;
};