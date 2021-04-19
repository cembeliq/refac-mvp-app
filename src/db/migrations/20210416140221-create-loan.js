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
        field: 'id_user',
      },
      idBook: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'id_book',
      },
      borrowedDate: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'borrowed_date',
      },
      dueDate: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'due_date',
      },
      returnDate: {
        type: Sequelize.DATE,
        field: 'return_date',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'deleted_at',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('loan');
  },
};
