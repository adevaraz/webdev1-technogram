const express = require("express");

const beritaController = require("../controller/berita");

const router = express.Router();

const uploadPhoto = require('../middleware/imageupload');



/*
 @author 14 KP

Route untuk membuat berita baru
*/
router.post("/new-news", uploadPhoto.imageUpload, beritaController.create);

/*
 @author 16 MN

Route untuk mendapatkan berita terkini
*/
router.get("/recent" , beritaController.recent);

/*
 @author 17 MU

Route untuk mendapatkan berita dengan most liked
*/
router.get("/most-liked" , beritaController.mostLiked);

/**
 * @author 31 ZV
 * 
 * Route mendapatkan berita berdasarkan kategori
 */
router.get("/", beritaController.getByCat);

/*
 @author 23 NM

Route untuk mendapatkan semua berita
*/
router.get("/all-news", beritaController.getAllNews);

/*
 @author 28 RA

Route untuk melakukan delete berita dengan diketahui id
*/
router.delete("/delete/:id", beritaController.delete);

/*
 @author 28 RA

Route untuk melakukan delete semua record berita
*/
router.delete("/delete-all", beritaController.deleteAll);

module.exports = router;