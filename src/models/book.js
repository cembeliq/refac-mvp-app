const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.category, {
        foreignKey: 'id_category',
        targetKey: 'id',
      }); // Adds fk_companyname to User
    }
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
    modelName: 'book',
    // underscored: true,
  });
  return Book;
};
