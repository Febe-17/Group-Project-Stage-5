
const Users         = require("../models").users;
const {validationResult}    = require('express-validator');

const getAllUsers = async(req,res) => {
    try {
        const user = await Users.findAll();
        res.status(200).json({
            status : true,
            message : user
        });
    } catch (error) {
        res.status(409).json({
            status : true,
            message : "Data gagal ditemukan"
        });
    }
}
const updateUser = async(req,res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                status : false,
                message : "Data yang diberikan tidak valid",
                errors: errors.array() 
            });
        } else {
            const { fullname,tgl_lahir,alamat,id_user } = req.body;
            const data = {
                fullname : fullname,
                tgl_lahir : tgl_lahir,
                alamat : alamat,
                updateAt : Date.now()
            }
            await Users.update(data, {
                where: {
                  id: id_user
                }
            });
            res.status(201).json({
                "status" : true,
                "messange" : "Data berhasil di update"
            });

        }
    } catch (error) {
        return res.status(409).json({
            "status": false,
            "message": "Data gagal diUpdate."
        });
    }
}


module.exports = {
    getAllUsers,
    updateUser
}