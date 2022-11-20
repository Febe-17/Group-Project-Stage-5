
const Labels        = require("../models").label;

const getAllLabels = async(req,res) => {
    try {
        const label = await Labels.findAll();
        res.status(200).json({
            status : true,
            message : label
        });
    } catch (error) {
        res.status(409).json({
            status : true,
            message : "Data gagal ditemukan"
        });
    }
}


module.exports = {
    getAllLabels,
}