const express = require('express')
const router = express.Router();

router.get('/', (req,res) =>{
    
    res.render('register',{
        layout : false,
        title : "Register",
        BASEURL : process.env.BASE_URL
    });
});


module.exports = router;
