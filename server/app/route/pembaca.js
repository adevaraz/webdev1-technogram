const express = require("express");

const pembacaController = require("../controller/pembaca");

const router = express.Router();

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