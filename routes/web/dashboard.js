const express       = require('express')
const router        = express.Router();
const refreshToken   = require("../../middleware/refreshToken")
const Users         = require("../../models").users;

router.get('/', refreshToken, async (req,res) => {
    const refreshToken  = req.cookies.jwt;

    const getUser       = await Users.findOne({where : {refresh_token : refreshToken}});
    res.render('dashboard', {
        layout  : "layouts/main",
        title   : "Dashboard",
        user    : getUser,
        BASEURL : process.env.BASEURL,
        TOKEN : refreshToken
    });
});

module.exports = router;
