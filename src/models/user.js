const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init({
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    photo: DataTypes.TEXT,
    email: DataTypes.STRING,
    email_verified_at: DataTypes.DATE,
    password: DataTypes.TEXT,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};
