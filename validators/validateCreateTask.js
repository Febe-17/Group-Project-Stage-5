const {
    body,
    check
  } = require('express-validator');
const task = require('../models/').tasks;
const user = require('../models/').users;

module.exports = [
    check('title').exists().withMessage("Title wajib diisi"),
    check('description').exists().withMessage("Description wajib diisi"),
    check('due_date').exists().withMessage("due_date wajib diisi"),
    check('label').exists().withMessage("label wajib diisi")
]