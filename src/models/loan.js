const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
  }
  Loan.init({
    idUser: DataTypes.INTEGER,
    idBook: DataTypes.INTEGER,
    borrowedDate: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    returnDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Loan',
  });
  return Loan;
};
