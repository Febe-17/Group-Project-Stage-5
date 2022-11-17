const express           = require('express')
const router            = express.Router();



// api
router.use("/api",  (req,res) => {

});


// web
router.use("/login",  (req,res) => {
    res.send("login")
});

module.exports = router;
