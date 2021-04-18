const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FinePayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FinePayment.init({
    receipt: DataTypes.STRING,
    amount: DataTypes.DOUBLE,
    idLoan: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'FinePayment',
  });
  return FinePayment;
};
