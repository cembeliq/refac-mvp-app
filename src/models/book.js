const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
  }
  Book.init({
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    author: DataTypes.TEXT,
    year: DataTypes.STRING,
    idCategory: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};
