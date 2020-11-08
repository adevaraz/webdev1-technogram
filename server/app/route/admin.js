const express = require("express");
const adminController = require("../controller/admin");
const authenticate = require('../middleware/adminAuth');
const {validate} = require("../middleware/validation");
const {adminValidationRules} = require("../middleware/validators/admin");

const router = express.Router();

/**
* @author 17 MU
*
* Route untuk membuat admin baru
*/
router.post("/new-admin", adminValidationRules(), validate, adminController.create);

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
router.put("/update-admin/:id", adminValidationRules(), validate, adminController.updateAdminById);

module.exports = router;

/*
    16 MN

  Route  Untuk signin Admin 
*/
router.post("/signin" , adminController.signin);

/*
    16 MN
    Route untuk signin admin
*/
router.post("/signout",authenticate , adminController.signout);

module.exports = router
