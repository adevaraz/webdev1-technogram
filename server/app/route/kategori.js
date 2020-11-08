const express = require("express");
const kategoriController = require("../controller/kategori");
const authenticate = require('../middleware/adminAuth');
const {kategoriValidationRules} = require('../middleware/validators/kategori');
const {validate} = require('../middleware/validation');

const router = express.Router();

router.post('/create' , authenticate , kategoriValidationRules() , validate , kategoriController.createKategori);

router.delete('/delete/:id' , authenticate , kategoriController.deleteKategoriByID);

router.get('/get/:id' , kategoriController.getKategoriByID);

router.get('/get' , kategoriController.getAllKategori);

router.put('/update/:id' , kategoriValidationRules() , validate, authenticate ,  kategoriController.updateKategoriById);

module.exports = router