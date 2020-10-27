const Pembaca = require('../model/pembaca');
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

        const result = await Pembaca.findAll({
            where: {
                id_pembaca: id
            }
        });

        res.status(200).json({
            message: `Success retrieve account data with id: ${id}`,
            data: result
        });
    } catch (err) {
        next(err);
    }
}