'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  post.init({
    user_id: DataTypes.STRING,
    post_photo: DataTypes.STRING,
    post_title: DataTypes.STRING,
    post_content: DataTypes.STRING,
    weather: DataTypes.STRING,
    wind: DataTypes.STRING,
    temp: DataTypes.STRING,
    top_id: DataTypes.INTEGER,
    bottom_id: DataTypes.INTEGER,
    xLocation: DataTypes.STRING,
    yLocation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};