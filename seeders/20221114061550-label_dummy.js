'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    
      await queryInterface.bulkInsert(
        'labels',
         [
          {
            name: 'Low',
            color : 'badge-secondary'
          },
          {
            name: 'Medium',
            color : 'badge-info'
          },
          {
            name: 'High',
            color : 'badge-danger'
          },
        ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('labels', null, {});
  }
};
