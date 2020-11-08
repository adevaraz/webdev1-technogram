require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
//nanti disini require route
const beritaRoutes = require('./app/route/berita')
const pembacaRoutes = require('./app/route/pembaca')
const adminRoutes = require('./app/route/admin')
const kategoriRoutes = require('./app/route/kategori')
const path = require("path");

const app = express();

//nanti disini require model-model nya
const Berita = require("./app/model/berita");
const Pembaca = require("./app/model/pembaca");
const Admin = require("./app/model/admin");
const sequelize = require("./app/util/database");
const Associations = require("./app/util/associations");

app.use(bodyParser.json());

/*
@author 14 KP
membuat folder agar dapat diakses public
*/
app.use(
  "/app/public/images",
  express.static(path.join(__dirname, "app", "public", "images"))
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//nanti disini app.use route
app.use("/news" , beritaRoutes);
app.use("/account", pembacaRoutes);
app.use("/admin", adminRoutes);
app.use('/kategori' , kategoriRoutes);

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
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (err) {
    console.log(err);
  }
};

init();
