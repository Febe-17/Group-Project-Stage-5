

const Users         = require("../models").users;
const Taks          = require("../models").tasks;
const Labels        = require("../models").label;
const Assigned      = require("../models").assigned;
const {validationResult}    = require('express-validator');

const create = async(req,res)=> {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ 
                status : false,
                message : "Data yang diberikan tidak valid",
                errors: errors.array() 
            });
        } else {
            const refreshToken = req.cookies.jwt;
            if(!refreshToken)
            {
                return res.sendStatus(401);
            }  
            const getUser = await Users.findOne({where : {refresh_token : refreshToken}});
            const { title,description,label,assign,due_date} = req.body;
            
            let getTaks = await Taks.create({
                title : title,
                description:description,
                id_label: label,
                due_date: due_date,
                created_by : getUser.id,
                status_task : 1
            });
            const id_taks = getTaks.id;
            await Assigned.create({
                id_user : assign,
                id_task : id_taks
            });
            return res.status(200).json({
                "status": true,
                "messange": "Task berhasil ditambahkan",
            });
        }
    } catch (error) {
        return res.status(409).json({
            "status": false,
            "message": "Data gagal ditambahkan."
        });
    }
}
const getTaskById = async(req,res) => {
    try {
        const task = await Taks.findOne({
            where : {
                id : req.params.id
            },include: [
                {
                    model: Labels,
                    attributes:['name','color']
                },
                {
                    model: Assigned,
                    attributes:['id_user'],
                    include: [
                        {
                            model : Users,
                            attributes:['fullname'],
                        }
                    ]
                }
            ]
        })
        res.json({
           task
        });
    } catch (error) {
        res.status(409).json({
            status : true,
            message : "Data gagal ditemukan"
        });
    }
}
const deleteByid = async (req,res) => {
    try{
        const { id_taks } = req.body;
        await Assigned.destroy({
            where: {
                id_task : id_taks
            }
        })
        await Taks.destroy({
            where: {
                id : id_taks
            }
        })

        res.status(200).json({
            status : true,
            message : "Task berhasil Diubah"
        });
    } catch (error) {
        res.status(409).json({
            status : true,
            message : "Data gagal Diubah"
        });
    }
}
const UpdateById = async(req,res) => {
    try {
        const { title,description,label,assign,due_date,status} = req.body;

    } catch (error) {
        console.log(error);
    }
}
const getDataTask = async(req,res) => {
    try {
        const taskOne = await Taks.findAll({
            where : {status_task : 1},
            include: [
                {
                    model: Labels,
                    attributes:['name','color']
                },
                {
                    model: Assigned,
                    attributes:['id_user'],
                    include: [
                        {
                            model : Users,
                            attributes:['fullname'],
                        }
                    ]
                }
            ]
        });
        const taskTwo = await Taks.findAll({
            where : {status_task : 2},
            include: [
                {
                    model: Labels,
                    attributes:['name','color']
                },
                {
                    model: Assigned,
                    attributes:['id_user'],
                    include: [
                        {
                            model : Users,
                            attributes:['fullname'],
                        }
                    ]
                }
            ]
        });
        const taskThree = await Taks.findAll({
            where : {status_task : 3},
            include: [
                {
                    model: Labels,
                    attributes:['name','color']
                },
                {
                    model: Assigned,
                    attributes:['id_user'],
                    include: [
                        {
                            model : Users,
                            attributes:['fullname'],
                        }
                    ]
                }
            ]
        });
        res.json({
            dataTaskOne     : taskOne,          
            dataTaskTwo     : taskTwo,
            dataTaskThree   : taskThree
        })
    } catch (error) {
        res.json({ 
            message : "data gagal ditemukan"
        })
    }
}
module.exports = {
    create,
    getTaskById,
    deleteByid,
    getDataTask
    // UpdateById
}