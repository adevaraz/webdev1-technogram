const express = require("express");

const beritaController = require("../controller/berita");

const router = express.Router();



/*
 @author 16 MN

Route untuk mendapatkan berita terkini
*/
router.get("/recent" , beritaController.recent);

/*
 @author 17 MU

Route untuk mendapatkan berita dengan most liked
*/
router.get("/most-liked" , beritaController.mostliked);





module.exports = router;
