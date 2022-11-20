
const Users                 = require("../models").users;
const bcrypt                = require("bcrypt");
const jwt                   = require("jsonwebtoken");
const {validationResult}    = require('express-validator');

const register = async(req,res)=> {
    try{
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                status : false,
                message : "Data yang diberikan tidak valid",
                errors: errors.array() 
            });
        } else {
            
            const {fullname,email,password} = req.body;
           
            const calt = await bcrypt.genSalt(10);
          
            const hashPassword = await bcrypt.hash(password,calt);
           
            const getUser = await Users.create({
                    fullname : fullname,
                    email : email,
                    password : hashPassword,
                    role: "user"   
            })
            res.status(201).json({
                'status'    : true,
                "message"   : "Pendaftaran User baru berhasil.",
                "email"     : `${getUser.email}`
            });
        }
    } catch (error) {
        res.status(409).json({
            'status'    : false,
            "message": "Pendaftaran User baru gagal!"
        });
    }
}

const login = async (req, res) => {
    try {
        console.log(req.body.email);
        if(!req.body.email) return res.status(422).json({"status":false,"message" : "Email wajib diisi"});
        if(!req.body.password) return res.status(422).json({"status":false,"message" : "Password wajib diisi"});
        const User = await Users.findOne({where : {email : req.body.email}})
        if(!User){
            return res.status(422).json({
                "status": false,
                "message": "Email Tidak Terdaftar."
            });
        } 
        const check = await bcrypt.compare(req.body.password, User.password);
      
        if(!check){
            return res.status(422).json({
                "status": false,
                "message": "Password Anda Salah."
            });
        } 
      
        const user_id = User.id;
        const nama = User.nama;
        const email = User.email;
        const accessToken = jwt.sign({user_id,nama,email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : '60s'
        });
         const refreshToken = jwt.sign({user_id,nama,email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn : '1d'
        });
        const getUser = await Users.update(
            {refresh_token: refreshToken},
            {
            where: {
                id: user_id }
         });
        res.cookie('jwt', refreshToken, {
            httpOnly : true,
            maxAge: 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            "status": true,
            "access_token": accessToken,
            "refresh_token": refreshToken,
        });
    } catch (error) {
        return res.status(409).json({
            "status": false,
            "message": "gagal Login."
        });
    }
}

const logout = async (req,res) => {
    
    try {
        const refresh_token = req.body.refresh_token;
        if(!refresh_token)  return res.status(422).json({"status":false,"message" : "refresh Token wajib diisi"});
        const user = await Users.findOne({where : {refresh_token : refresh_token}});
        if(!user)   return res.sendStatus(403);
        const user_id = user.id
        await Users.update({
            refresh_token : null
        },{
            where : {
                id : user_id
            }
        })
        res.clearCookie('refresh_token');
        return res.json({
            "status": true,
            "message": "User logged out successfull"
        })
    } catch (error) {
        return res.json({
            "status": false,
            "message": "Sorry, the user cannot be logged out!",
        })
    }
    
}

module.exports = {
    login,
    register,
    logout
}