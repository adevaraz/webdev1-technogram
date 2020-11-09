const Pembaca = require('../model/pembaca');
const Berita = require('../model/berita');
const { Op, NUMBER } = require("sequelize");
const sequelize = require("../util/database");
const jwt = require('jsonwebtoken');
const cache = require("../util/cache");
const bcrypt = require("bcryptjs");
const Kategori = require('../model/kategori');
const PembacaKategori = require('../model/pembacaKategori');

/**
 * @author 31 ZV
 * 
 * Membuat akun pembaca baru
 * 
 * @author 28 RA
 * Add validator and Encrypt password functionality with bcrypt
 */
exports.create = async(req, res, next) => {
    try {
        //karena sudah ada validator maka request pasti valid.
        const pembaca = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            last_change_pwd : (new Date().getTime()) /1000
        }

        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(pembaca.password, salt);
        pembaca.password = hash;

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

 @author 28 RA
 Add validator and Encrypt password functionality with bcrypt
*/
exports.update = async(req, res, next) => {
    //karena sudah ada validator maka request pasti valid.
    const id = req.params.id;
    const username = req.body.username;
    const email = req.body.email;
    let password = req.body.password;
    try {
        if(id!= req.decodedToken.id){
            const error = new Error("Not your id");
            error.statusCode = 401;
            error.cause = "Not your id";
            throw error;
        }
        const account = await Pembaca.findByPk(id);
        if(account != null) {
            const isPasswordSame = await bcrypt.compare(password, account.password);
            if(!isPasswordSame) {
                let salt = await bcrypt.genSalt(10);
                let hash = await bcrypt.hash(password, salt);
                password = hash;
            } else {
                password = account.password;
            }
            const updateAccount = await account.update({
                username : username,
                email : email,
                password : password
            });
            res.status(201).json({
                message : `Success update Account with id ${id}`
            });
        } else {
            res.status(404).json({
                message : `Account with id ${id} not found`
            });
        }
    } catch(err) {
        next(err);
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

/**
 * @author 17 MU
 * 
 * Menyukai berita (Like)
 */
exports.likeNews = async(req, res, next) => {
    const readerId = req.query.account;
    const newsId = req.query.news;
    const catId = req.query.category;

    try {
        const account = await Pembaca.findByPk(readerId);
        const category = await Kategori.findByPk(catId);
        const news = await Berita.findByPk(newsId);

        if(account != null && category != null) {
            // Check whether account has liked news or not
            account.hasLike(news).then(function(exist) {
                if(exist) {
                    // Unlike -- remove from 'menyukai' table
                    async function unlike() {
                        await account.removeLike(news);
                        await news.update({
                            jumlah_likes : sequelize.literal('jumlah_likes - 1')
                        }, { where : { id_berita : newsId}});
                        await PembacaKategori.update({
                            jumlah : sequelize.literal('jumlah - 1')
                        }, { where : {id_pembaca : readerId, id_kategori : catId}});
                        await PembacaKategori.destroy({
                            where : { jumlah : 0 }
                        });
                        var id_cat = await PembacaKategori.max('jumlah', {
                            where : {id_pembaca : readerId, id_kategori : catId}
                        });
                        if(await Number.isNaN(id_cat)){
                            await Pembaca.update({ most_liked_category : null},{
                                where : {id_pembaca : readerId}
                            });
                        }
                        else{
                            await Pembaca.update({ most_liked_category : id_cat},{
                                where : {id_pembaca : readerId}
                            });
                        }
                    }
                    unlike();
                    
    
                    res.status(201).json({
                        message: `Success unlike news with id : ${newsId}`
                    });
                } else {
                    // checking join table
                    account.hasCount(category).then(function(exist) {
                        // if there is no join table with that category and taht account
                        async function count() {
                            if(!exist){
                                await account.addCount(category);
                            }
                            await PembacaKategori.update({
                                jumlah : sequelize.literal('jumlah + 1')
                            }, { where : {id_pembaca : readerId, id_kategori : catId}});
                        }
                        count();
                    });
                    // Like -- add to 'menyukai' table
                    async function like() {
                        await account.addLike(news);
                        await news.update({
                            jumlah_likes : sequelize.literal('jumlah_likes + 1')
                        }, { where : { id_berita : newsId}});
                        var id_cat = await PembacaKategori.max('jumlah', {
                            where : {id_pembaca : readerId, id_kategori : catId}
                        });
                        await Pembaca.update({ most_liked_category : id_cat},{
                            where : {id_pembaca : readerId}
                        });
                    }
                    like();
                    
                    res.status(201).json({
                        message: `Success like news with id : ${newsId}`
                    });
                }
            });
            // async function updateMostLiked() {
            //     var id_cat = await PembacaKategori.max('jumlah', {
            //         where : {id_pembaca : readerId, id_kategori : catId}
            //     });
            //     await Pembaca.update({ most_liked_category : id_cat},{
            //         where : {id_pembaca : readerId}
            //     });
            // }
            // updateMostLiked();
        } else {
            res.status(404).json({
                message: `Data not found`
            });
        }
    } catch (err) {
        next(err);
    }
}

/**
 * @author 31 ZV
 * 
 * Menyimpan berita (bookmark berita)
 */
exports.saveNews = async(req, res, next) => {
    const readerId = req.query.account;
    const newsId = req.query.news;

    try {
        const account = await Pembaca.findByPk(readerId);
        const news = await Berita.findByPk(newsId);

        if(account != null && news != null) {
            // Check whether account has bookmarked news or not
            account.hasSaved(news).then(function(exist) {
                if(exist) {
                    // Unbookmark -- remove from 'menyimpan' table
                    account.removeSaved(news);
    
                    res.status(201).json({
                        message: `Success unsaved news with id : ${newsId}`
                    });
                } else {
                    // Bookmark -- add to 'menyimpan' table
                    account.addSaved(news);
    
                    res.status(201).json({
                        message: `Success saved news with id : ${newsId}`
                    });
                }
            });
        } else {
            res.status(404).json({
                message: `Data not found`
            });
        }
    } catch (err) {
        next(err);
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
