const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  event.init({
    creator_id: DataTypes.INTEGER,
    title_event: DataTypes.STRING,
    link_webinar: DataTypes.STRING,
    description: DataTypes.TEXT,
    banner: DataTypes.TEXT,
    price: DataTypes.DOUBLE,
    quantity: DataTypes.INTEGER,
    status: DataTypes.STRING,
    event_start_date: DataTypes.DATE,
    event_end_date: DataTypes.DATE,
    campaign_start_date: DataTypes.DATE,
    campaign_end_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'event',
  });
  return event;
};
