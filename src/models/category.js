const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.book, { foreignKey: 'id_category', sourceKey: 'id' });
      // define association here
    }
  }
  Category.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'category',
  });
  return Category;
};
