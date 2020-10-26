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
router.post("/all-account", pembacaController.create);

/**
 * @author 31 ZV
 * 
 * Route untuk mengambil satu akun pembaca berdasarkan id
 */
router.post("/:id", pembacaController.create);