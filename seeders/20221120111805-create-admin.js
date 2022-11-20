
const bcrypt   = require("bcrypt");
const password = 'admin123'
const calt =  bcrypt.genSaltSync(10);
          
const hashPassword =  bcrypt.hashSync(password,calt);

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert(
      'users',
       [
        {
          fullname: 'Super Admin',
          email : 'admin@gmail.com',
          password : hashPassword,
          role : 'admin'
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
     await queryInterface.bulkDelete('users', null, {});
  }
};
