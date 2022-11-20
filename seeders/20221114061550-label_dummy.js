'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    
      await queryInterface.bulkInsert(
        'labels',
         [
          {
            name: 'Low',
            color : 'badge-secondary',
            createdAt: Date.now(), 
            updatedAt: Date.now()
          },
          {
            name: 'Medium',
            color : 'badge-info',
            createdAt: Date.now(), 
            updatedAt: Date.now()
          },
          {
            name: 'High',
            color : 'badge-danger',
            createdAt: Date.now(), 
            updatedAt: Date.now()
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
