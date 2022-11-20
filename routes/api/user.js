const express                                   = require('express')
const {getAllUsers,updateUser}                  = require("../../controllers/UserController")
const verifyToken                               = require("../../middleware/verifyToken")
const validateUpdateUser                        = require("../../validators/validateUpdateUser")
const router                                    = express.Router();

router.use(verifyToken);
router.get('/get-all-users',     getAllUsers);
router.put('/', validateUpdateUser,updateUser)




module.exports = router;
