const Admin = require("../model/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cache = require("../util/cache");
const sequelize = require("../util/database");
const {AdminConst : AdminAuthConst} = require('../util/authConst');

/**
 * 
 *
 * @author 17 MU
 *
 * Membuat berita
 *
 * @author 28 RA
 * Add validator and Encrypt password functionality with bcrypt
 */
exports.create = async (req, res, next) => {
  try {

    //karena sudah ada validator maka request body pasti valid.
    const admin = {
      username: req.body.username,
      password: req.body.password,
      last_changed_pwd: Math.floor(new Date().getTime() / 1000),
    };
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(admin.password, salt);
    admin.password = hash;
    await Admin.create(admin);
    res.status(201).json({
      message: "Success add new admin!",
      data: admin,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @author 17 MU
 *
 * Mengambil semua admin
 */

exports.getAllAdmin = async (req, res) => {
  try {
    const admin = await Admin.findAll();
    if (admin.length > 0) {
      res.status(200).json({
        message: "Success retrieve all data",
        data: admin,
      });
    } else {
      res.status(200).send({
        message: "No Admin Found",
      });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * @author 17 MU
 *
 * Delete Admin dengan diketahui id nya
 */
exports.deleteAdminById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Admin.destroy({
      where: { id_admin: id },
    });
    //jika result === 1 maka record berhasil di delete
    if (result === 1) {
      const key = process.env.ADMIN_PREFIX + id.toString();
      await cache.settextAsync(
        key,
        60 * 17,
        JSON.stringify({
          isDeleted: true,
          lastPasswordChange: Math.floor(new Date().getTime() / 1000),
        })
      );
      res.status(200).json({
        message: `Post with id=${id} was deleted successfully.`,
        data: result,
      });
    } else {
      const error = new Error("Could not find admin account");
      error.statusCode = 404;
      error.cause = "Invalid Post ID";
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

/**
 * @author 17 MU
 *
 * Delete Semua Record Admin, include restart sequence id_admin
 */
exports.deleteAllAdmin = async (req, res, next) => {
  try {
    const result = await Admin.destroy({
      where: {},
      truncate: false,
    });
    await sequelize.query("ALTER SEQUENCE admins_id_admin_seq RESTART WITH 1", {
      raw: true,
    });
    res.status(200).json({
      message: `All Admin records was deleted successfully.`,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @author 17 MU
 *
 * Update Admin dengan diketahui id nya
 *
 * @author 28 RA
 * Add validator and Encrypt password functionality with bcrypt
 * 
 * @Author 16 MN
 * Menambahakan Token baru refresh dan access , saat user mengganti password
 */
exports.updateAdminById = async (req, res, next) => {
  try {
    //karena sudah ada validator maka request body pasti valid.
    const id = req.params.id;

    const oldAdmin = await Admin.findByPk(id);

    if (!oldAdmin) {
      const error = new Error("Update Failed!");
      error.statusCode = 401;
      error.cause = `Cannot update Admin with id=${id}. Admin was not found.`;
      throw error;
    }

    let token;
    const isPasswordSame = await bcrypt.compare(
      req.body.password,
      oldAdmin.password
    );
    if (!isPasswordSame) {
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(req.body.password, salt);
      req.body.password = hash;
      oldAdmin.last_changed_pwd = Math.floor(new Date().getTime() / 1000);
      token = await createAccessToken(oldAdmin);
      await createRefreshToken(oldAdmin ,res)

    } else {
      req.body.password = oldAdmin.password;
    }
    const result = await Admin.update(
      {
        ...req.body,
        last_changed_pwd: oldAdmin.last_changed_pwd,
      },
      {
        where: { id_admin: id },
      }
    );
    if (result == 1) {
      if (!token) {
        res.status(200).json({
          message: `Admin with id=${id} was updated successfully.`,
        });
      } else {
        res.status(200).json({
          message: `Admin with id=${id} was updated successfully.`,
          token: token,
        });
      }
    } else {
      const error = new Error("Update Failed!");
      error.statusCode = 401;
      error.cause = `Cannot update Admin with id=${id}. Admin was not found.`;
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

/*
    16 MN
    Untuk signin admin !
*/

exports.signin = async (req, res, next) => {
  try {
    const username = req.body.username;
    const admin = await Admin.findOne({
      where: {
        username: username,
      },
    });
    if (!admin) {
      const error = new Error("Invalid credential");
      error.statusCode = 401;
      error.cause = "Account with such username is not exist";
      throw error;
    }

    const password = req.body.password;
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    // const isPasswordValid = password === admin.password;
    if (!isPasswordValid) {
      const error = new Error("Invalid credential");
      error.statusCode = 401;
      error.cause = "Wrong password";
      throw error;
    }

    const token = await createAccessToken(admin);
    await createRefreshToken(admin , res);
    res.status(200).json({
      token: token,
      message: "Success Login",
    });
  } catch (err) {
    next(err);
  }
};

/*
    16 MN
    Untuk signout admin
  */
 exports.signout = async (req, res, next) => {
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
    nulifyClientRefreshToken(res);
    res.json({
      message: "Success Log out",
    });
  } catch (err) {
    next(err);
  }
};


/*
@author 16 MN
membuat access token menggunakan refresh token bagi admin
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
    
    if(decodedRefreshToken.roles !== process.env.ADMIN_PREFIX){
      const error = new Error('Forbidden access');
      error.statusCode = 401;
      error.cause = 'You are not allowed to access this route , please contact your administrator'
      throw error;
    }
    const adminId = decodedRefreshToken.id
    const admin = await Admin.findByPk(adminId);
    
    if(!admin){
      const error = new Error('User with such token not found');
      error.statusCode = 401;
      error.cause = 'You are account might be deleted'
      throw error;
    }
    
    console.log(admin.last_changed_pwd);
    console.log(decodedRefreshToken.iat);
    if(admin.last_changed_pwd > decodedRefreshToken.iat){
      const error = new Error('Invalid token');
      error.statusCode = 401;
      error.cause = 'You might re-login to access this route'
      throw error;      
    }
    
    const newToken = await createAccessToken(admin);

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
membuat refresh token bagi admin
*/
const createRefreshToken = async (admin , res) => {
  const token = jwt.sign(
    {
      id: admin.id_admin,
      roles: process.env.ADMIN_PREFIX
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: AdminAuthConst.ADMIN_REFRESHTOKEN_EXPIRED}
  );

  res.cookie('refresh' , token , {
    signed : true,
    maxAge :  AdminAuthConst.ADMIN_REFRESHTOKEN_EXPIRED,
    httpOnly  : true
  })
  return token; 
}

/*

*/
const createAccessToken = async (admin) => {
  const token = jwt.sign(
    {
      id: admin.id_admin,
      roles: process.env.ADMIN_PREFIX,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: AdminAuthConst.ADMIN_ACCESSTOKEN_EXPIRED }
  );
  const key = process.env.ADMIN_PREFIX + admin.id_admin.toString();
  await cache.settextAsync(
    key,
    AdminAuthConst.ADMIN_REDIS_EXPIRED, 
    JSON.stringify({
      isDeleted: false,
      lastPasswordChange: admin.last_changed_pwd,
    })
  );
  return token;
};

/*
*
*
*/
const nulifyClientRefreshToken = (res) => {
  res.cookie('refresh' , '' , {
    maxAge :  0,
    httpOnly  : true,
    signed : true
  })
}