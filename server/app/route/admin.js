const express = require("express");

const adminController = require("../controller/admin");

const router = express.Router();

/**
* @author 17 MU
*
* Route untuk membuat admin baru
*/
router.post("/new-admin", adminController.create);

/**
* @author 17 MU
*
* Route untuk mengambil semua admin
*/
router.get("/all-admin", adminController.getAllAdmin);

/**
* @author 17 MU
*
* Route untuk menghapus Admin by Id
*/
router.delete("/delete-admin/:id", adminController.deleteAdminById);

/**
* @author 17 MU
*
* Route untuk menghapus Admin by Id
*/
router.delete("/delete-all-admin", adminController.deleteAllAdmin);

/**
* @author 17 MU
*
* Route untuk update Admin by Id
*/
router.put("/update-admin/:id", adminController.updateAdminById);

module.exports = router;