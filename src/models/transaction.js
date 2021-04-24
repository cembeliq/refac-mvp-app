const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaction.init({
    participant_id: DataTypes.INTEGER,
    creator_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER,
    amount: DataTypes.DOUBLE,
    status_payment: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};
