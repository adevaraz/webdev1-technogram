const express = require("express");

const beritaController = require("../controller/berita");

const router = express.Router();



/*
 @author 16 MN

Route untuk mendapatkan berita terkini
*/
router.get("/recent" , beritaController.recent);

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
