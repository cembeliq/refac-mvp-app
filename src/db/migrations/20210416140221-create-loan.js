module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('loan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idUser: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      idBook: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      borrowedDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      dueDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      returnDate: {
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('loan');
  },
};
