require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
//nanti disini require route
const beritaRoutes = require('./app/route/berita')
const pembacaRoutes = require('./app/route/pembaca')
const adminRoutes = require('./app/route/admin')
const kategoriRoutes = require('./app/route/kategori')
const path = require("path");
const app = express();
const cors = require('cors');
//nanti disini require model-model nya
const sequelize = require("./app/util/database");
const Associations = require("./app/util/associations");
const {google} = require("googleapis");
const privateKey = require("./app/analytics-key/Technogram_Project-269c0d250d29.json");


const corstOptionDelegate = (req , callback ) => {
  callback(null , {
    origin : req.header('Origin'),
    credentials : true
  })
}

/*
@author 16 MN
untuk mengatsi cors
*/
app.use(cors(corstOptionDelegate))



/*
@author 16MN
untuk parsing cookies 
*/
app.use(cookieParser(process.env.COOKIES_SECRET_KEY));

app.use(bodyParser.json());

/*
@author 14 KP
membuat folder agar dapat diakses public
*/
app.use(
  "/app/public/images",
  express.static(path.join(__dirname, "app", "public", "images"))
);


//nanti disini app.use route
app.use("/news" , beritaRoutes);
app.use("/account", pembacaRoutes);
app.use("/admin", adminRoutes);
app.use('/kategori' , kategoriRoutes);
/*Generating access token for google analytics*/
app.get("/accessTokens", (req,res) => {

  // configure a JWT auth client
  let jwtClient = new google.auth.JWT(
    privateKey.client_email,
    null,
    privateKey.private_key,
    'https://www.googleapis.com/auth/analytics.readonly');

    jwtClient.authorize(function (err, token) {
    if (err) {
      console.log(err);
      return res.status(500).send('Error');
    } else {
      return res.send(token.access_token);
    }
  });
})

/*
 @author 16 MN

Error Handler , ketika terjadi error pada salah satu middleware maka akan di catch 
oleh handler ini.(Untuk mengurang boilerplate) . Bisa dibuat route sendiri misal ErrorHandler.js 
*/
app.use((error, req, res, next) => {
  console.log(error)
  const status = error.statusCode || 500;
  const message = error.message;
  const cause = error.cause || "Unknown";
  console.log(error);
  res.status(status).json({
    message: message,
    error: status,
    cause: cause,
  });
});


//nanti disini taro relasi
Associations();

const init = async () => {
  try {
    await sequelize.sync();
    // set port, listen for requests
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
    require('./socket').init(server);
  } catch (err) {
    console.log(err);
  }
};

init();
