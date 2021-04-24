/* eslint-disable no-unused-vars */
const bcrypt = require('bcryptjs');

let arrUser = [];
let user = {};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 1; i < 50; i++) {
      user = {
        username: `john${i}`,
        fullname: 'John Doe',
        email: `cembeliq${i}@yopmail.com`,
        password: bcrypt.hashSync('123456', 8),
        role: 'creator',
        created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      };
      arrUser.push(user);
    }
    await queryInterface.bulkInsert('users', arrUser, {});
    arrUser = [];
    for (let i = 50; i < 100; i++) {
      user = {
        username: `john${i}`,
        fullname: 'John Doe',
        email: `cembeliq${i}@yopmail.com`,
        password: bcrypt.hashSync('123456', 8),
        role: 'participant',
        created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      };
      arrUser.push(user);
    }
    console.log(arrUser);
    await queryInterface.bulkInsert('users', arrUser, {});
    await queryInterface.bulkInsert('users', [{
      username: 'john',
      fullname: 'John Doe',
      email: 'cembeliq@yopmail.com',
      password: bcrypt.hashSync('123456', 8),
      role: 'admin',
      created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
