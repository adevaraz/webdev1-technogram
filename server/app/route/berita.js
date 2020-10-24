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



module.exports = router;
