const Pembaca = require('../model/pembaca');
const Berita = require('../model/berita');
const { Op } = require("sequelize");
const sequelize = require("../util/database");

/**
 * @author 31 ZV
 * 
 * Membuat akun pembaca baru
 */
exports.create = async(req, res, next) => {
    try {
        const pembaca = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        await Pembaca.create(pembaca);

        res.status(201).json({
            message: 'Account created successfully',
            data: pembaca
        });

    } catch (err) {
        next(err);
    }
}

/**
 * @author 31 ZV
 * 
 * Mengambil semua akun pembaca
 */
exports.getAll = async(req, res, next) => {
    try {
        const pembaca = await Pembaca.findAll();

        if(pembaca.length > 0) {
            res.status(200).json({
                message: 'Success retrieve account data',
                data: pembaca
            });
        } else {
            res.status(204).json({
                message: 'Account not found',
                data: pembaca
            });
        }
    } catch (err) {
        next(err);
    }
}

/**
 * @author 31 ZV
 * 
 * Mengambil satu akun pembaca berdasarkan id
 */
exports.getById = async(req, res, next) => {
    try {
        const id = req.params.id;

        const result = await Pembaca.findByPk(id);

        res.status(200).json({
            message: `Success retrieve account data with id: ${id}`,
            data: result
        });
    } catch (err) {
        next(err);
    }
}

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
        await sequelize.query("ALTER SEQUENCE pembacas_id_pembaca_seq RESTART WITH 1", {raw: true});
        res.status(200).json({
            message: 'All account was deleted successfully.',
            data: result
        })
    } catch (err) {
        next(err)
    }
}

/*
 @author 02 AP

 Mendapatkan berita yang disimpan oleh pembaca
*/
exports.getSave = async(req, res, next) => {
    const id = req.params.id;
    console.log(id);
    try{
        
        const saved = await Pembaca.findAll({
            where :{
                id_pembaca : id
            },
            include :[{
                model : Berita,
                as: 'saved',
            }
        ]
        });
        if(saved.length > 0) {
            res.status(200).json({
                message: 'Success retrieve saved data',
                data: saved
            });
        } else {
            res.status(204).json({
                message: 'Account not found',
                data: saved
            });
        }
    }catch (err){
        next(err)
    }
}
