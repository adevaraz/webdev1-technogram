const express = require("express");
const pembacaController = require("../controller/pembaca");
const router = express.Router();
const authentication = require("../middleware/authentication");
const { validate } = require("../middleware/validation");
const { pembacaValidationRules } = require("../middleware/validators/pembaca");

/**
 * @author 31 ZV
 * 
 * Route untuk membuat akun baru
 */
router.post("/create", pembacaValidationRules(), validate, pembacaController.create);

/**
 * @author 31 ZV
 * 
 * Route untuk mengambil semua akun pembaca
 */
router.get("/all-account", pembacaController.getAll);

/**
 * @author 31 ZV
 * 
 * Route untuk mengambil satu akun pembaca berdasarkan id
 */
router.get("/getbyid", pembacaController.getById);

/**
 * @author 23 NM
 * 
 * Route untuk update akun
 */
router.put("/update/:id", authentication.validateUser, pembacaController.update);

/**
 * @author 23 NM
 * 
 * Route untuk delete akun berdasarkan id
 */
router.delete("/delete/:id", authentication.validateUser, pembacaController.delete);

/**
 * @author 23 NM
 * 
 * Route untuk delete semua akun
 */
router.delete("/delete-all",authentication.validateAdmin, pembacaController.deleteAll);

/**
 * @author 02 AP
 * 
 * Route untuk mendapatkan berita yang di save pembaca
 */
router.get("/get-save/:id", pembacaController.getSave);

/**
 * @author 14 KP
 * 
 * Route untuk sign in pembaca
 */
router.post("/sign-in", pembacaController.signin);

/**
 * @author 14 KP
 * 
 * Route untuk sign out pembaca
 */
router.post("/sign-out", authentication.validateUser, pembacaController.signout);

/**
 * @author 31 ZV
 * 
 * Route untuk menyimpan berita (bookmark berita)
 */
router.post("/save-news", pembacaController.saveNews);


/**
 * @author 16 MN
 * 
 * Route untuk mendapatkan notifikasi
 */
router.get('/notifikasi' , authentication.validateUser, pembacaController.getUserNotification);


module.exports = router;

