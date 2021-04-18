/* eslint-disable no-unused-vars */
const arrBook = (cat) => {
  const arrBookTemp = [];
  for (let i = 1; i < 10; i++) {
    const book = {
      title: 'title',
      description: 'description',
      author: 'cembeliq',
      year: '2022',
      id_category: cat,
      stock: 100,
      status: 'tersedia',
      created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    };
    arrBookTemp.push(book);
  }
  return arrBookTemp;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('book', arrBook(1), {});
    await queryInterface.bulkInsert('book', arrBook(2), {});
    await queryInterface.bulkInsert('book', arrBook(3), {});
    await queryInterface.bulkInsert('book', arrBook(4), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('book', null, {});
  },
};
