const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {}
  Category.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
