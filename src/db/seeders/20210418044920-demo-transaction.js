/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const arrTrx = (stat) => {
  const arrTrxTemp = [];
  for (let i = 1; i < 100000; i++) {
    const trx = {
      participant_id: getRandomIntInclusive(50, 75),
      creator_id: getRandomIntInclusive(1, 25),
      event_id: getRandomIntInclusive(1, 49),
      amount: 100000,
      status_payment: stat,
      created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    };
    arrTrxTemp.push(trx);
  }
  return arrTrxTemp;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('transactions', arrTrx('passed'), {});
    await queryInterface.bulkInsert('transactions', arrTrx('failed'), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('transactions', null, {});
  },
};
