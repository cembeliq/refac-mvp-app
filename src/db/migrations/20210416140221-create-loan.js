module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('loan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_user: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      id_book: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      borrowed_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      due_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      return_date: {
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
