const express                                   = require('express')
const {getAllLabels}                            = require("../../controllers/LabelController")
const verifyToken                               = require("../../middleware/verifyToken")
const router                                    = express.Router();

router.use(verifyToken);
router.get('/get-all-labels',     getAllLabels);




module.exports = router;
