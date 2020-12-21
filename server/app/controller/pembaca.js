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
const mail = require("./mailer");

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

    const insertedPembaca = await Pembaca.findOne({
      where : { email: req.body.email }
    });
    
    await sendVerifEmail(insertedPembaca);

    res.status(201).json({
      message: "Verification email sent successfully"
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @author 31 ZV
 *
 * Memeriksa token verifikasi email
 */
exports.verifyEmailConfirm = async (req, res, next) => {
  try {
    const token = req.query.ref;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const pembacaId = decoded.id;

    const account = await Pembaca.findByPk(pembacaId);
    
    if(account != null) {
      if(!account.is_verified) {
        await account.update({
          is_verified: true
        });

        let mostLikedCategory;
        if(account.most_liked_category) {
          mostLikedCategory = await Kategori.findByPk(account.most_liked_category);
        }

        const accessToken = await createAccessToken(account);
        await createRefreshToken(account, res);
  
        res.status(201).json({
          message: `Account with id ${pembacaId} succesfully activated`,
          data: account,
          token: accessToken,
          mostLikedCategory: mostLikedCategory != undefined ? mostLikedCategory.nama_kategori : null
        });
      } else {
        res.status(201).json({
          message: `Account with id ${pembacaId} has been activated before`,
          data: account
        });
      }
    } else {
      res.status(404).json({
        message: `Account with id ${pembacaId} not found`
      });
    }

  } catch (err) {
    if(err.message === "jwt expired") {
      const error = new Error("Timeout");
      error.statusCode = 401;
      error.cause = "This link is expired.";
      next(error);
    } else {
      next(err);
    }
  }
}

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
    const key = req.query.key || '';
    const currentPage = req.query.page || 1;
    const perPage = req.query.perpage || 10;
    const offset = (currentPage-1) * perPage;
    const result = await Pembaca.findAndCountAll({
      where: {
        [Op.or] : [
            {username : sequelize.where(sequelize.fn('LOWER', sequelize.col('username')),'LIKE' , '%' + key.toLowerCase()  + '%')},
            {email : sequelize.where(sequelize.fn('LOWER', sequelize.col('email')),'LIKE' , '%' + key.toLowerCase()  + '%')}
        ]
      },
      limit : perPage,
      offset : offset,
      order : [
        ['id_pembaca' , 'ASC']
    ]
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
        if(!news){
          const error = new Error("Invalid News id");
          error.statusCode = 401;
          error.cause = "News with such id is not exist";
          throw error;
        }
        let newestMostLiked;
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
                        const mostLikedID = await PembacaKategori.findOne({
                          where : { id_pembaca : readerId},
                          order : [
                            ['jumlah' , 'DESC']
                          ]
                        })
                        newestMostLiked = account.most_liked_category;
                        if(account.most_liked_category != mostLikedID.id_kategori){                      
                          await Pembaca.update({ most_liked_category : catId},{
                            where : {id_pembaca : readerId}
                          });
                          newestMostLiked = mostLikedID.id_kategori;
                        }
                        const newestLikedKategori = await Kategori.findByPk(newestMostLiked)
                        newestMostLiked =  newestLikedKategori.nama_kategori

                    }
                    like().then( () => {
                      res.status(201).json({
                        message: `Success like news with id : ${newsId}`,
                        data : {
                          newestMostLiked
                        }
                    });
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
 * Memeriksa apakah sudah menyimpan berita atau belum
 */
exports.isLiked = async (req, res, next) => {
  const readerId = req.decodedToken.id;
  const newsId = req.query.news;

  try {
    const account = await Pembaca.findByPk(readerId);
    const news = await Berita.findByPk(newsId);

    if (account != null && news != null) {
      // Check whether account has bookmarked news or not
      const status = await account.hasLike(news);

      var message = "Liked";
      if(!status) {
        message = "Not liked"
      }

      res.status(200).json({
        message: `${message}`,
        data: status
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

/**
 * @author 31 ZV
 *
 * Memeriksa apakah sudah menyimpan berita atau belum
 */
exports.isSaved = async (req, res, next) => {
  const readerId = req.decodedToken.id;
  const newsId = req.query.news;

  try {
    const account = await Pembaca.findByPk(readerId);
    const news = await Berita.findByPk(newsId);

    if (account != null && news != null) {
      // Check whether account has bookmarked news or not
      const status = await account.hasSaved(news);

      var message = "Saved";
      if(!status) {
        message = "Not saved"
      }

      res.status(200).json({
        message: `${message}`,
        data: status
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
  const currentPage = req.query.page || 1;
  const perPage = req.query.perpage || 5;
  const offset = (currentPage-1) * perPage;
  console.log("perpage server: "+perPage)
  console.log("MASUK NANYA ID "+id);
  try {
    const saved = await Pembaca.findByPk(id, {
      include: [
        {
          model: Berita,
          as: "saved",
        },
      ],
    
    });

    const savedBerita = saved.saved
    const sliceOfSaved = savedBerita.slice(offset , +offset + +perPage);
    const nextPageOffset = (currentPage) * perPage;
    const nextPage = savedBerita.length > nextPageOffset

    console.log(savedBerita.length+ "ini panjang saved berita")
    console.log("panjang slice "+sliceOfSaved.length)
    if (savedBerita.length > 0) {
      res.status(200).json({
        message: "Success retrieve saved data",
        data: {
          sliceOfSaved,
          nextPage
        }
         
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

    // Check whether account verified or not
    if(pembaca.is_verified) {
      if (pembaca) {
        const isPasswordTrue = bcrypt.compare(password, pembaca.password);
        if (!isPasswordTrue) {
          const error = new Error("Invalid credential");
          error.statusCode = 401;
          error.cause = "Wrong password";
          throw error;
        }
        let mostLikeCategory;
        //Get mostliked category name
        console.log(pembaca);
        if(pembaca.most_liked_category){
           mostLikeCategory = await Kategori.findByPk(pembaca.most_liked_category);
        }
        //generate token 
        const accessToken = await createAccessToken(pembaca);
        await createRefreshToken(pembaca,res);
        res.status(200).json({
          message: "sign in Success",
          token: accessToken,
          mostLikedCategory : mostLikeCategory!=undefined? mostLikeCategory.nama_kategori : null,
          username: pembaca.username
        });
      } else {
        const error = new Error("Invalid credential");
        error.statusCode = 401;
        error.cause = "Account with such email is not exist";
        throw error;
      }
    } else {
      const error = new Error("Unverified account");
      error.statusCode = 403;
      error.cause = "Account has not been verified";

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
    const currentPage = req.query.page || 1;
    const perPage = req.query.perpage || 10;
    const offset = (currentPage-1) * perPage;
    const result = await Pembaca.findByPk(id, {
      include: [
        {
          model: Berita,
          as : 'notification'
        }
      ],
    });


    if (!result) {
      res.status(200).json({
        message: "Success retrieve user notification",
        data: {},
      });
    }
    console.log(result.notification);
    const notifications = result.notification.slice(offset , offset + perPage);
    const nextPageOffset = (currentPage) * perPage;
    const nextPage = result.notification.length > nextPageOffset


    console.log(result);
    res.status(200).json({
      message: "Success retrieve user notification",
      data: {
        notifications,
        nextPage
      },
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

    let mostLikeCategory;
      //Get mostliked category name
      console.log(pembaca);
      if(pembaca.most_liked_category){
         mostLikeCategory = await Kategori.findByPk(pembaca.most_liked_category);
      }
    
    const newToken = await createAccessToken(pembaca);

    res.status(201).json({
      message : 'success create new access token',
      token : newToken,
      username: pembaca.username,
      email: pembaca.email,
      mostLikedCategory : mostLikeCategory!=undefined? mostLikeCategory.nama_kategori : null,
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
 - menghapus cookies pada cookies client , sehingga tidak menyimpan refresh token dan disalahgunakan 
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

/**
 * @author 14 KP
 *
 * Menambah kategori untuk personalize
 */
exports.addPersonalize = async (req, res, next) => {
  const userId = req.decodedToken.id;
  const categoryId = req.query.category;
  console.log("userID "+userId)
  console.log("categoryID "+categoryId)
  try {
    const account = await Pembaca.findByPk(userId);
    const category = await Kategori.findByPk(categoryId);

    if (account != null && category != null) {
      account.hasSubscribe(category).then((exist) => {
        if (exist) {
          account.removeSubscribe(category);

          res.status(201).json({
            message: `Success unsubscribe category with id : ${categoryId}`,
          });
        } else {
          account.addSubscribe(category);
          res.status(201).json({
            message: `Success subscribe category with id : ${categoryId}`,
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

/**
 * @author 14 KP
 *
 * Mendapatkan kategori yang disubscribe user
 */
exports.getPersonalize = async (req, res, next) => {
  const id = req.decodedToken.id;
  try {
    const subscribe = await Pembaca.findByPk(id, {
      include: [
        {
          model: Kategori,
          as: "subscribe",
        },
      ],
    });

    const subscribeCat = subscribe.subscribe
    if (id!=0 && subscribeCat!=0) {
      res.status(200).json({
        message: "Success retrieve subscribed categories",
        data: subscribeCat
      });
    } else {
      res.status(204).json({
        message: "not found",
        data: saved,
      });
    }
  } catch (err) {
    next(err);
  }
};

/** 
 * @author 31 ZV
 *
 * Mengirim email verifikasi
 */
const sendVerifEmail = async (pembaca) => {
  const verificationToken = jwt.sign(
    { id: pembaca.id_pembaca },
    process.env.JWT_SECRET_KEY,
    { expiresIn: UserAuthConst.USER_VERIF_EXPIRED }
  );

  // Send verification email with token
  mail.verifyMail(pembaca.email, pembaca.username, verificationToken);
  return verificationToken;
}

/** 
 * @author 31 ZV
 *
 * Mengirim email verifikasi
 */
exports.resendVerifEmail = async (req, res, next) => {
  try {
    const email = req.body.email;
    const account = await Pembaca.findOne({
      where : { email: email }
    });

    await sendVerifEmail(account);

    res.status(200).json({
      message: "Success resend verification email"
    });
  } catch (err) {
    next(err);
  }
}