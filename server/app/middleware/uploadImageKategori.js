const multer = require("multer");

const { v4: uuidv4 } = require('uuid');


/*
@author 17 MU
Untuk menentukan file gambarnya ingin disimpan dimana 
*/
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'app/public/categories');
    },
    filename: (req, file, cb) => {
       const fileExtension = "." + file.mimetype.toString().split("/")[1];
        cb(null, uuidv4()+ fileExtension)
    }
});

/*
@author 14 KP
Untuk memfilter tipe file
*/
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

exports.imageUpload = multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("url_gambar_kategori")
