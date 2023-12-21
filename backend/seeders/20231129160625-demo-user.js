'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('users', [
      {
        name: 'Test User',
        email: 'test@test.com',
        password: '$2b$10$.YHkS28dvLis25kq/P//BeJiatqeBBTCRZ28WCgPlzvgs3SA2uAHa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Test User 2',
        email: 'test2@test.com',
        password: '$2b$10$.YHkS28dvLis25kq/P//BeJiatqeBBTCRZ28WCgPlzvgs3SA2uAHa',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});
  }
};
