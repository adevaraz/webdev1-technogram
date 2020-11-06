const express = require("express");
const pembacaController = require("../controller/pembaca");
const router = express.Router();
const authentication = require("../middleware/authentication");

/**
 * @author 31 ZV
 * 
 * Route untuk membuat akun baru
 */
router.post("/create", pembacaController.create);

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
router.get("/:id", pembacaController.getById);

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
module.exports = router;