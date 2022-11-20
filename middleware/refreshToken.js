const jwt       = require("jsonwebtoken")
const Users     = require("../models").users;

const refreshToken  = async (req,res,next) => {
    const refreshToken = req.cookies.jwt;
    console.log(refreshToken);
    if(!refreshToken)
    {
        return res.redirect('/login');
    }  
    const getUser = await Users.findOne({where : {refresh_token : refreshToken}});
    if(!getUser){
        return res.redirect('/login');;
    }
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err,decode) => {
        if(err) return res.redirect('/login');;
    });    
    next();
}

module.exports = refreshToken;