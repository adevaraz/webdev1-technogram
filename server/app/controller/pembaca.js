const Pembaca = require('../model/pembaca');
const { Op } = require("sequelize");
const sequelize = require("../util/database");
const jwt = require('jsonwebtoken');
const cache = require("../util/cache");
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
            password: req.body.password,
            last_change_pwd : (new Date().getTime()) /1000
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
        if(id!= req.decodedToken.id){
            console.log("BANDINGIN NIH "+ id +" "+ req.decodedToken.id);
            const error = new Error("Not your id");
            error.statusCode = 401;
            error.cause = "Not your id";
            throw error;
        }
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
        if(id!= req.decodedToken.id){
            const error = new Error("Not your id");
            error.statusCode = 401;
            error.cause = "Not your id";
            throw error;
        }
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
@author 14 KP
Membuat sign in pembaca
*/
exports.signin = async(req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const pembaca = await Pembaca.findOne({
            where: {
                email: email 
            }
        })
        if(pembaca){
            const isPasswordTrue = password===pembaca.password;
            //bcrypt.compare(password, pembaca.password)
            if (!isPasswordTrue) {
                const error = new Error("Invalid credential");
                error.statusCode = 401;
                error.cause = "Wrong password";
                throw error;
              }
            //generate token
            const accessToken = jwt.sign(
                {
                    id: pembaca.id_pembaca,
                    roles: process.env.PEMBACA_PREFIX,
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: 60 * 15 }
              );
            //to add user to cache
            const key = process.env.PEMBACA_PREFIX + pembaca.id_pembaca.toString();
            await cache.settextAsync(
              key,
              60*17,
              JSON.stringify({
                isDeleted: false,
                lastPasswordChange: pembaca.lastPasswordChange
              })
            );
            res.status(200).json({
                message: 'sign in Success',
                token: accessToken,
                }
            )
        } else {
            const error = new Error("Invalid credential");
            error.statusCode = 401;
            error.cause = "Account with such email is not exist";
            throw error;
        }
        
    } catch (err) {
        next(err)
    }
}

/*
@author 14 KP
Membuat sign out pembaca
*/

exports.signout = async(req, res, err) => {
    try {
        const decodedToken = req.decodedToken;
        const token = req.token;
        const tokenTimout = decodedToken.exp;
        const currentTime = Math.round(new Date().getTime() / 1000);
        const timeDifference = tokenTimout - currentTime;
        if (currentTime - timeDifference > 10) {
          await cache.settextAsync(
            token,
            timeDifference,
            JSON.stringify({ isInvalid: false })
          );
        }
        res.json({
          message: "Success Log out",
        });
      } catch (err) {
        next(err);
      }
}
