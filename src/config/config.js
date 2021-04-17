// const fs = require('fs');
// const path = require('path');

module.exports = {
  development: {
    username: 'root',
    password: 'cembeliq',
    database: 'db_rental_buku',
    host: '172.17.0.2',
    port: 3306,
    dialect: 'mariadb',
    dialectOptions: {
      bigNumberStrings: true,
    },
    pool: {
      max: 10,
      min: 1,
      acquire: 10,
      idle: 10,
    },
    timezone: 'Etc/GMT+7',
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
      // ssl: {
      //   ca: fs.readFileSync(path.join(__dirname, 'mysql-ca-master.crt')),
      // },
    },
    pool: {
      max: parseInt(process.env.PROD_DB_POOL_MAX, 10),
      min: parseInt(process.env.PROD_DB_POOL_MIN, 10),
      acquire: parseInt(process.env.PROD_DB_POOL_ACQUIRE, 10),
      idle: parseInt(process.env.PROD_DB_POOL_IDLE, 10),
    },
    timezone: process.env.PROD_DB_TIMEZONE,
  },
};
