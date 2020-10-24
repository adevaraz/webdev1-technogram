const express = require("express");

const beritaController = require("../controller/berita");

const router = express.Router();

/*
 @author 16 MN

Route untuk mendapatkan berita terkini
*/
router.get("/recent" , beritaController.recent);

/**
 * @author 31 ZV
 * 
 * Route mendapatkan berita berdasarkan kategori
 */
router.get("/", beritaController.getByCat);

module.exports = router;
