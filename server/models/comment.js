'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.comment.belongsTo(models.post, {foreignKey:"post_id", targetKey:"id"})
      models.comment.hasMany(models.like, {foreignKey:"comment_id", sourceKey:"id"})
    }
  };
  comment.init({
    post_id: DataTypes.INTEGER,
    comment_user_id: DataTypes.STRING,
    comment_content: DataTypes.STRING,
    comment_like: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};