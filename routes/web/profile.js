const express = require('express')
const router = express.Router();
const refreshToken   = require("../../middleware/refreshToken")
const Users         = require("../../models").users;

router.get('/', async (req,res) =>{
    const refreshToken  = req.cookies.jwt;

    const getUser       = await Users.findOne({where : {refresh_token : refreshToken}});
    console.log(getUser);
    res.render('profile',{
        layout  : "layouts/main",
        user    : getUser,
        title : "Profile",
        BASEURL : process.env.BASE_URL,
        TOKEN : refreshToken
    });
});


module.exports = router;
