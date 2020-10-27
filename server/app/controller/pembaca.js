const Pembaca = require('../model/pembaca');
const { Op } = require("sequelize");
const sequelize = require("../util/database");

/*
 @author 23 NM

 Update akun pembaca.
*/
exports.update = async(req, res, next) => {
    const id = req.params.id;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const account = await Pembaca.findByPk(id);
        if(account != null) {
            const updateAccount = await account.update({
                username : username,
                email : email,
                password : password
            })
            res.status(201).json({
                message : `Success update Account with id ${id}`
            })
        } else {
            res.status(404).json({
                message : `Account with id ${id} not found`
            })
        }
    } catch(err) {
        next(err)
    }
}

/*
 @author 23 NM

 Menghapus akun pembaca berdasarkan id
*/
exports.delete = async(req, res, next) => {
    const id = req.params.id;
    try {
        const account = await Pembaca.findByPk(id)
        if(account != null) {
            const destroy = await Pembaca.destroy({
                where: { id_pembaca: id },
            })
            res.status(201).json({
                message : `Success delete Account with id ${id}`
            })
        } else {
            res.status(404).json({
                message : `Account with id ${id} not found`
            })
        }
    } catch(err) {
        next(err)
    }
}

/*
 @author 23 NM

 Menghapus semua akun pembaca
*/
exports.deleteAll = async(req, res, next) => {
    try {
        const result = await Pembaca.destroy({
            where: {},
            truncate: false,
        })
        res.status(200).json({
            message: 'All account was deleted successfully.',
            data: result
        })
    } catch (err) {
        next(err)
    }
}

