const express = require("express");
const beritaController = require("../controller/berita");
const authenticate = require('../middleware/adminAuth');
const uploadPhoto = require('../middleware/imageupload');

const router = express.Router();

/*
 @author 14 KP

Route untuk membuat berita baru
*/
router.post("/new-news", uploadPhoto.imageUpload, beritaController.create);

/*
 @author 14 KP

Route untuk mempublikasikan berita
*/
router.put("/publish/:id", beritaController.updatePublish)
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
 @author 02 AP

Route untuk update berita
*/
router.put("/update/:id",uploadPhoto.imageUpload, beritaController.update);

/*
 @author 28 RA

Route untuk melakukan delete berita dengan diketahui id
*/
router.delete("/delete/:id", authenticate, beritaController.delete);

/*
 @author 28 RA

Route untuk melakukan delete semua record berita
*/
router.delete("/delete-all", authenticate, beritaController.deleteAll);

/*
 @author 28 RA

 Route untuk Mendapatkan berita populer berdasarkan view terbanyak dengan atau tanpa
 kata kunci
*/
router.get("/popular", beritaController.popularNews);

/*
 @author 28 RA

 Get one Berita By id
*/
router.get("/:id", beritaController.getNewsById);

module.exports = router;