const Pembaca = require('../model/pembaca');
const Berita = require('../model/berita');
const { Op, NUMBER } = require("sequelize");
const sequelize = require("../util/database");
const jwt = require("jsonwebtoken");
const cache = require("../util/cache");
const bcrypt = require("bcryptjs");
const Kategori = require('../model/kategori');
const PembacaKategori = require('../model/pembacaKategori');
const {UserConst : UserAuthConst} = require('../util/authConst');
/**
 * @author 31 ZV
 *
 * Membuat akun pembaca baru
 *
 * @author 28 RA
 * Add validator and Encrypt password functionality with bcrypt
 */
exports.create = async (req, res, next) => {
  try {
    //karena sudah ada validator maka request pasti valid.
    const pembaca = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      last_changed_pwd: Math.floor(new Date().getTime() / 1000),
    };

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(pembaca.password, salt);
    pembaca.password = hash;

    await Pembaca.create(pembaca);

    res.status(201).json({
      message: "Account created successfully",
      data: pembaca,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @author 31 ZV
 *
 * Mengambil semua akun pembaca
 */
exports.getAll = async (req, res, next) => {
  try {
    const pembaca = await Pembaca.findAll();

    if (pembaca.length > 0) {
      res.status(200).json({
        message: "Success retrieve account data",
        data: pembaca,
      });
    } else {
      res.status(204).json({
        message: "Account not found",
        data: pembaca,
      });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * @author 31 ZV
 *
 * Mengambil satu akun pembaca berdasarkan id
 */
exports.getById = async (req, res, next) => {
  try {
    const id = req.decodedToken.id;

    const result = await Pembaca.findByPk(id);
    console.log(result.last_changed_pwd);
    res.status(200).json({
      message: `Success retrieve account data with id: ${id}`,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @author 17 MU
 *
 * Mencari akun pembaca dengan berdasarkan key
 */
exports.searchBy = async (req, res, next) => {
  try {
    let key = req.query.key;
    
    const result = await Pembaca.findAll({
      where: {
        [Op.or] : [
            { username : key }, { email : key }
        ]
      },
    });
    
    res.status(200).json({
      message: `Success retrieve accounts`,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

/*
 @author 23 NM

 Update akun pembaca.

 @author 28 RA
 Add validator and Encrypt password functionality with bcrypt
*/
exports.update = async (req, res, next) => {
  //karena sudah ada validator maka request pasti valid.
  const id = req.decodedToken.id;
  const username = req.body.username;
  const email = req.body.email;
  let password = req.body.password;
  let accessToken;
  try {
    let lastPasswordChange;
    const account = await Pembaca.findByPk(id);
    if (account != null) {
      const isPasswordSame = await bcrypt.compare(password, account.password);
      if (!isPasswordSame) {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);
        password = hash;
        lastPasswordChange = Math.floor(new Date().getTime() / 1000);
        account.last_changed_pwd = lastPasswordChange;
        //generate token
        accessToken = await createAccessToken(account);
        await createRefreshToken(account,res)
        
      } else {
        password = account.password;
        lastPasswordChange = account.lastPasswordChange;
      }
      const updateAccount = await account.update({
        username: username,
        email: email,
        password: password,
        last_changed_pwd: lastPasswordChange,
      });
      if(accessToken){
        res.status(201).json({
            message: `Success update Account with id ${id}`,
            token : accessToken
          });
      }else{
        res.status(201).json({
            message: `Success update Account with id ${id}`
          });
      }
    } else {
      res.status(404).json({
        message: `Account with id ${id} not found`,
      });
    }
  } catch (err) {
    next(err);
  }
};

/*
 @author 23 NM

 Menghapus akun pembaca berdasarkan id
*/
exports.delete = async (req, res, next) => {
  const id = req.params.id;
  try {
    // if (id != req.decodedToken.id) {
    //   const error = new Error("Not your id");
    //   error.statusCode = 401;
    //   error.cause = "Not your id";
    //   throw error;
    // }
    const account = await Pembaca.findByPk(id);
    if (account != null) {
      const destroy = await Pembaca.destroy({
        where: { id_pembaca: id },
      });
      const key = process.env.PEMBACA_PREFIX + account.id_pembaca.toString();
      await cache.settextAsync(
        key,
        60 * 17,
        JSON.stringify({
          isDeleted: true,
          lastPasswordChange: account.last_changed_pwd,
        })
      )
      res.status(201).json({
        message: `Success delete Account with id ${id}`,
      });
    } else {
      res.status(404).json({
        message: `Account with id ${id} not found`,
      });
    }
  } catch (err) {
    next(err);
  }
};

/*
 @author 23 NM

 Menghapus semua akun pembaca
*/
exports.deleteAll = async (req, res, next) => {
  try {
    const result = await Pembaca.destroy({
      where: {},
      truncate: false,
    });
    await sequelize.query(
      "ALTER SEQUENCE pembacas_id_pembaca_seq RESTART WITH 1",
      { raw: true }
    );
    res.status(200).json({
      message: "All account was deleted successfully.",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @author 17 MU
 * 
 * Menyukai berita (Like)
 */
exports.likeNews = async(req, res, next) => {
    const readerId = req.decodedToken.id;
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
exports.saveNews = async (req, res, next) => {
  const readerId = req.decodedToken.id;
  const newsId = req.query.news;

  try {
    const account = await Pembaca.findByPk(readerId);
    const news = await Berita.findByPk(newsId);

    if (account != null && news != null) {
      // Check whether account has bookmarked news or not
      account.hasSaved(news).then((exist) => {
        if (exist) {
          // Unbookmark -- remove from 'menyimpan' table
          account.removeSaved(news);

          res.status(201).json({
            message: `Success unsaved news with id : ${newsId}`,
          });
        } else {
          // Bookmark -- add to 'menyimpan' table
          account.addSaved(news);

          res.status(201).json({
            message: `Success saved news with id : ${newsId}`,
          });
        }
      });
    } else {
      res.status(404).json({
        message: `Data not found`,
      });
    }
  } catch (err) {
    next(err);
  }
};

/*
 @author 02 AP

 Mendapatkan berita yang disimpan oleh pembaca
*/
exports.getSave = async (req, res, next) => {
  const id = req.decodedToken.id;
  console.log(id);
  try {
    const saved = await Pembaca.findAll({
      where: {
        id_pembaca: id,
      },
      include: [
        {
          model: Berita,
          as: "saved",
        },
      ],
    });
    if (saved.length > 0) {
      res.status(200).json({
        message: "Success retrieve saved data",
        data: saved,
      });
    } else {
      res.status(204).json({
        message: "Account not found",
        data: saved,
      });
    }
  } catch (err) {
    next(err);
  }
};

/*
@author 14 KP
Membuat sign in pembaca
*/
exports.signin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const pembaca = await Pembaca.findOne({
      where: {
        email: email,
      },
    });
    if (pembaca) {
      const isPasswordTrue = bcrypt.compare(password, pembaca.password);
      if (!isPasswordTrue) {
        const error = new Error("Invalid credential");
        error.statusCode = 401;
        error.cause = "Wrong password";
        throw error;
      }
      //generate token 
      const accessToken = await createAccessToken(pembaca);
      await createRefreshToken(pembaca,res);
      res.status(200).json({
        message: "sign in Success",
        token: accessToken
      });
    } else {
      const error = new Error("Invalid credential");
      error.statusCode = 401;
      error.cause = "Account with such email is not exist";
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

/*
@author 14 KP
Membuat sign out pembaca
*/

exports.signout = async (req, res, err) => {
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
    nullifyClientRefreshToken(res);
    res.json({
      message: "Success Log out",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @author 16 MN
 *
 * Mengambil notifikasi
 */
exports.getUserNotification = async (req, res, next) => {
  try {
    const id = req.decodedToken.id
    const result = await Pembaca.findByPk(id, {
      include: [
        {
          model: Berita,
          as : 'notification'
        },
      ],
    });

    if (!result) {
      const error = new Error("User with such id not found");
      error.statusCode = 404;
      throw error;
    }
    console.log(result);
    res.status(200).json({
      message: "Success retrieve user notification",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

/*
@author 16 MN
membuat accestoken dari refresh token yang diberikan oleh pembaca
*/
exports.getAccessToken = async (req , res , next ) => {
  try{
    const refreshToken = req.signedCookies['refresh'];
    if(!refreshToken){
      const error = new Error('Not auhtorized');
      error.statusCode = 403;
      throw error;
    }
    const decodedRefreshToken = jwt.verify(refreshToken , process.env.JWT_REFRESH_KEY);
    
    if(decodedRefreshToken.roles !== process.env.PEMBACA_PREFIX){
      const error = new Error('Forbidden access');
      error.statusCode = 401;
      error.cause = 'You are not allowed to access this route , please contact your administrator'
      throw error;
    }
    const pembacaId = decodedRefreshToken.id
    const pembaca = await Pembaca.findByPk(pembacaId);
    
    if(!pembaca){
      const error = new Error('User with such token not found');
      error.statusCode = 401;
      error.cause = 'You are account might be deleted'
      throw error;
    }
    
    if(pembaca.last_changed_pwd > decodedRefreshToken.iat){
      const error = new Error('Invalid token');
      error.statusCode = 401;
      error.cause = 'You might re-login to access this route'
      throw error;      
    }
    
    const newToken = await createAccessToken(pembaca);

    res.status(201).json({
      message : 'success create new access token',
      token : newToken
    })

  }catch(err){
    next(err);
  }
}

/*
@author 16 MN
membuat refresh token bagi pembaca
*/
const createRefreshToken = async (pembaca , res) => {
  const token = jwt.sign(
    {
      id: pembaca.id_pembaca,
      roles: process.env.PEMBACA_PREFIX,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: UserAuthConst.USER_REFRESHTOKEN_EXPIRED}
  );
  /*
   Refresh token expire time ===  COOKIES EXPIRED , so when refresh token is expired , then
   the refresh token in the cookies will also be expired/deleted
   */  
  res.cookie('refresh' , token , {
    signed : true,
    maxAge :  UserAuthConst.USER_COOKIES_EXPIRED,
    httpOnly  : true,
    sameSite: 'None',
    secure : true
  })
  return token; 
}

/*
@author 16 MN
membuat access token bagi pembaca
*/

const createAccessToken = async (pembaca) => {
  const accessToken = jwt.sign(
    {
      id: pembaca.id_pembaca,
      roles: process.env.PEMBACA_PREFIX,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: UserAuthConst.USER_ACCESSTOKEN_EXPIRED }
  );
  const key = process.env.PEMBACA_PREFIX + pembaca.id_pembaca.toString();
  await cache.settextAsync(
    key,
    UserAuthConst.USER_REDIS_EXPIRED,
    JSON.stringify({
      isDeleted: false,
      lastPasswordChange: pembaca.last_changed_pwd,
    })
  );
  return accessToken;
}

/*
@author 16 MN
 - menghapusk cookies pada cookies client , sehingga tidak menyimpan refresh token dan disalahgunakan 
(digunakan ketika log out)
*/
const nullifyClientRefreshToken = (res) =>{
  res.cookie('refresh' , '' , {
    maxAge :  0,
    httpOnly  : true,
    signed : true,
    sameSite: 'None',
    secure : true
  })
}

