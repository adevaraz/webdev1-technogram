const express = require("express");

const beritaController = require("../controller/berita");

const router = express.Router();



/*
 @author 16 MN

Route untuk mendapatkan berita terkini
*/
router.get("/recent" , beritaController.recent);

/*
 @author 02 AP

Route untuk update berita
*/
router.put("/update/:id",beritaController.update);





module.exports = router;
