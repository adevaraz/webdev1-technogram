const Admin = require("../model/admin");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const cache = require("../util/cache");
const sequelize = require("../util/database");

/**
* @author 17 MU
*
* Membuat berita
*/
exports.create = async (req, res, next) => {
    try{
        const admin = {
            username: req.body.username,
            password: req.body.password
        };
        // save to database
        await Admin.create(admin)
        res.status(201).json({
            message : 'Success add new admin!',
            data : admin
        });

    }catch(err){
        next(err)
    } 
}

/**
* @author 17 MU
*
* Mengambil semua admin
*/

exports.getAllAdmin = async(req, res) => {
    try {
        const admin = await Admin.findAll()
        if(admin.length > 0) {
            res.status(200).json({
                message : 'Success retrieve all data',
                data : admin
            })
        } else {
            res.status(200).send({
                message: 'No Admin Found'
            })
        }
    }catch (err) {
        next(err)
    }
}

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
            res.status(200).json({
                message: `Post with id=${id} was deleted successfully.`,
                data: result
            });
        } else {
            const error = new Error("Could not find specific post");
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
        await sequelize.query("ALTER SEQUENCE admins_id_admin_seq RESTART WITH 1", {raw: true});
        res.status(200).json({
            message: `All Admin records was deleted successfully.`,
            data: result
        });
    } catch (err) {
        next(err);
    }
};

/**
* @author 17 MU
*
* Update Admin dengan diketahui id nya
*/
exports.updateAdminById = async (req, res, next) => {
    const id = req.params.id;
    await Admin.update(req.body, {
        where: { id_admin: id }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).json({
                message: `Admin with id=${id} was updated successfully.`
            });
        } else {
            res.status(200).json({
                message: "Cannot update Admin with id=${id}. Maybe Admin was not found or req.body is empty!"
            });
        }
    })
    .catch(err => {
        next(err);
    })
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
    //   const isPasswordValid = await bcrypt.compare(password, admin.password);
    const isPasswordValid = password === admin.password;
    if (!isPasswordValid) {
      const error = new Error("Invalid credential");
      error.statusCode = 401;
      error.cause = "Wrong password";
      throw error;
    }
    const token = jwt.sign(
      {
        id: admin.id_admin,
        roles: process.env.ADMIN_PREFIX,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: 60 * 15 }
    );
    const key = process.env.ADMIN_PREFIX + admin.id_admin.toString();
    await cache.settextAsync(
      key,
      60*17,
      JSON.stringify({
        isDeleted: false,
        //Dikasih nilai defaul karena atribut lastpasswordchange belum ada
        lastPasswordChange: admin.lastPasswordChange || 1516239022
      })
    );



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
    res.json({
      message: "Success Log out",
    });
  } catch (err) {
    next(err);
  }
};
