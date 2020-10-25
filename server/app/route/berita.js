const express = require("express");

const beritaController = require("../controller/berita");

const router = express.Router();

/*
 @author 16 MN

Route untuk mendapatkan berita terkini
*/
router.get("/recent" , beritaController.recent);

/*
 @author 14 KP

Route untuk membuat berita baru
*/
router.post("/new-news", beritaController.create);

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

module.exports = router;