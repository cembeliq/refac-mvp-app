module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('fine_payment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      receipt: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      amount: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      idLoan: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'id_loan',
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
    await queryInterface.dropTable('fine_payment');
  },
};
