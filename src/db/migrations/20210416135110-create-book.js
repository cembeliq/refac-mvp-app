module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('book', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      author: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      year: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      idCategory: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'id_category',
      },
      stock: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('book');
  },
};
