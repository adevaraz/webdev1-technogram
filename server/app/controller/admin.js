const Admin = require("../model/admin");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const cache = require("../util/cache");
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
