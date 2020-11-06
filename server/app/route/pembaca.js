const express = require("express");

const pembacaController = require("../controller/pembaca");

const router = express.Router();

const {validate} = require("../middleware/validation");
const {pembacaValidationRules} = require("../middleware/validators/pembaca");

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
router.get("/:id", pembacaController.getById);

/**
 * @author 23 NM
 * 
 * Route untuk update akun
 */
router.put("/update/:id", pembacaValidationRules(), validate, pembacaController.update);

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