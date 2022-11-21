const express                                   = require('express')
const {create,getTaskById,deleteByid, getDataTask}  = require("../../controllers/TaskController")
const validateCreateTask                        = require("../../validators/validateCreateTask")
const verifyToken                               = require("../../middleware/verifyToken")
const router                                    = express.Router();

router.use(verifyToken);
router.post("/",            validateCreateTask, create);
router.get('/get-data',     getDataTask);
router.get("/:id" ,         getTaskById);
router.delete("/" ,                 deleteByid);



module.exports = router;
