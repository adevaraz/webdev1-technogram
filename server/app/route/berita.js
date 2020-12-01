const express = require("express");
const beritaController = require("../controller/berita");
const authenticate = require('../middleware/authentication');
const uploadPhoto = require('../middleware/imageupload');
const {newsValidationRules, newsValidate} = require('../middleware/validators/berita');

const router = express.Router();

/*
 @author 14 KP

Route untuk membuat berita baru
*/
router.post("/new-news", authenticate.validateAdmin, uploadPhoto.imageUpload, newsValidationRules(), newsValidate, beritaController.create);

/*
 @author 14 KP

Route untuk mempublikasikan berita
*/
router.put("/publish/:id", authenticate.validateAdmin, beritaController.updatePublish)
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
 @author 23 NM

Route untuk mengambil berita berdasarkan kata kunci
*/
router.get("/search", beritaController.searchBy);

/*
 @author 02 AP

Route untuk update berita
*/
router.put("/update/:id",authenticate.validateAdmin, uploadPhoto.imageUpload, newsValidationRules(), newsValidate,beritaController.update);

/**
 * @author 31 ZV
 * 
 * Route untuk update reader berita
 */
router.put("/update-reader/:id", beritaController.updateReader);

/*
 @author 28 RA

Route untuk melakukan delete berita dengan diketahui id
*/
router.delete("/delete/:id", authenticate.validateAdmin, beritaController.delete);

/*
 @author 28 RA

Route untuk melakukan delete semua record berita
*/
router.delete("/delete-all", authenticate.validateAdmin, beritaController.deleteAll);

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

router.post('/new-image' , uploadPhoto.imageUpload , beritaController.uploadImgHandler);

router.post('/delete-image'  , beritaController.deleteImgHandler);

module.exports = router;