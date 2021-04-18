/* eslint-disable no-unused-vars */
const bcrypt = require('bcryptjs');

const arrUser = [];
let user = {};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 1; i < 50; i++) {
      user = {
        name: 'John Doe',
        address: 'test',
        photo: 'photo',
        email: `cembeliq${i}@yopmail.com`,
        password: bcrypt.hashSync('123456', 8),
        role: 'user',
        created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      };
      arrUser.push(user);
    }
    await queryInterface.bulkInsert('user', arrUser, {});
    await queryInterface.bulkInsert('user', [{
      name: 'John Doe',
      address: 'test',
      photo: 'photo',
      email: 'cembeliq@yopmail.com',
      password: bcrypt.hashSync('123456', 8),
      role: 'admin',
      created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {});
  },
};
