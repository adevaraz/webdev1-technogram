const express = require("express");
const pembacaController = require("../controller/pembaca");
const router = express.Router();
const authentication = require("../middleware/authentication");
const { validate } = require("../middleware/validation");
const { createPembacaValidationRules, pembacaSignInValidationRules, updatePembacaValidationRules } = require("../middleware/validators/pembaca");

/**
 * @author 31 ZV
 * 
 * Route untuk membuat akun baru
 */
router.post("/create", createPembacaValidationRules(), validate, pembacaController.create);

/**
 * @author 31 ZV
 * 
 * Route untuk memeriksa apakah berita sudah dilike atau belum
 */
router.put("/confirm", pembacaController.verifyEmailConfirm);

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
router.get("/get-by-id", pembacaController.getById);

/**
 * @author 17 MU
 * 
 * Route untuk mencari akun pengguna berdasarkan username atau email
 */
router.get("/search", pembacaController.searchBy);

/**
 * @author 23 NM
 * 
 * Route untuk update akun
 */
router.put("/update", authentication.validateUser, updatePembacaValidationRules(), validate, pembacaController.update);

/**
 * @author 23 NM
 * 
 * Route untuk delete akun berdasarkan id
 */
router.delete("/delete/:id", authentication.validateAdmin, pembacaController.delete);

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
router.get("/get-save", authentication.validateUser, pembacaController.getSave);

/**
 * @author 14 KP
 * 
 * Route untuk sign in pembaca
 */
router.post("/sign-in", pembacaSignInValidationRules(), validate, pembacaController.signin);

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
router.post("/save-news", authentication.validateUser, pembacaController.saveNews);

/**
 * @author 31 ZV
 * 
 * Route untuk memeriksa apakah berita sudah disimpan (bookmark berita) atau belum
 */
router.get("/save-state", authentication.validateUser, pembacaController.isSaved);

/**
 * @author 16 MN
 * 
 * Route untuk mendapatkan notifikasi
 */
router.get('/notifikasi' , authentication.validateUser, pembacaController.getUserNotification);

/**
 * @author 17 MU
 * 
 * Route untuk menyukai berita (like berita)
 */
router.post("/like-news", authentication.validateUser, pembacaController.likeNews);

/**
 * @author 31 ZV
 * 
 * Route untuk memeriksa apakah berita sudah dilike atau belum
 */
router.get("/like-state", authentication.validateUser, pembacaController.isLiked);

/**
 * @author 16 MN
 * 
 * Route untuk request access token menggunakan refresh token
 */
router.post('/refresh' , pembacaController.getAccessToken);

/**
 * @author 14 KP
 * 
 * Route untuk menambahkan kategori ke daftar personalizenya
 */
router.post('/add-personalize', authentication.validateUser, pembacaController.addPersonalize);

/**
 * @author 14 KP
 * 
 * Route untuk mendapatkan kategori dari daftar personalizenya
 */
router.get('/get-personalize', authentication.validateUser, pembacaController.getPersonalize);
module.exports = router;
