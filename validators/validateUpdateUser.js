const {
    body,
    check
  } = require('express-validator');

module.exports = [
    check('fullname').exists().withMessage("fullname wajib diisi"),
    check('tgl_lahir').exists().withMessage("Tgl Lahir wajib diisi"),
    check('alamat').exists().withMessage("Alamat wajib diisi")
]