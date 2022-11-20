const express = require('express')
const router = express.Router();

router.get('/', (req,res) =>{
    
    res.render('login',{
        layout : false,
        title : "Login",
        BASEURL : process.env.BASE_URL
    });
});


module.exports = router;
