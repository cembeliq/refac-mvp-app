/* eslint-disable no-unused-vars */
const arrEvent = [];
let event = {};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    for (let i = 1; i < 50; i++) {
      event = {
        creator_id: 1,
        title_event: `Event ${i}`,
        link_webinar: `webinar_${i}`,
        description: `Description ${i}`,
        banner: 'banner',
        price: 100000,
        quantity: 50,
        status: 'release',
        event_start_date: '2021-05-03',
        event_end_date: '2021-05-04',
        campaign_start_date: '2021-04-25',
        campaign_end_date: '2021-05-02',
        created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      };
      arrEvent.push(event);
    }
    await queryInterface.bulkInsert('events', arrEvent);

    for (let i = 50; i < 100; i++) {
      event = {
        creator_id: 1,
        title_event: `Event ${i}`,
        link_webinar: `webinar_${i}`,
        description: `Description ${i}`,
        banner: 'banner',
        price: 100000,
        quantity: 50,
        status: 'draft',
        event_start_date: '2021-05-03',
        event_end_date: '2021-05-04',
        campaign_start_date: '2021-04-25',
        campaign_end_date: '2021-05-02',
        created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      };
      arrEvent.push(event);
    }
    await queryInterface.bulkInsert('events', arrEvent);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('events', null, {});
  },
};
