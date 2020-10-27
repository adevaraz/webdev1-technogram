const express = require("express");

const pembacaController = require("../controller/pembaca");

const router = express.Router();

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
router.put("/update/:id", pembacaController.update);

/**
 * @author 23 NM
 * 
 * Route untuk delete akun berdasarkan id
 */
router.delete("/delete/:id", pembacaController.delete);

/**
 * @author 23 NM
 * 
 * Route untuk delete semua akun
 */
router.delete("/delete-all", pembacaController.deleteAll);

module.exports = router;