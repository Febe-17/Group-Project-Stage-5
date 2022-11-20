const jwt       = require("jsonwebtoken")
const Users     = require("../models").users;

const verifyToken  = async (req,res,next) => {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(token == null){
        return res.sendStatus(401)
    } 
    jwt.verify(token,process.env.REFRESH_TOKEN_SECRET, (err,decode) => {
        if(err) return res.sendStatus(403)
    });    
    next();
   
}

module.exports = verifyToken;