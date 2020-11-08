const express = require("express");
const kategoriController = require("../controller/kategori");
const authenticate = require('../middleware/authentication');
const {kategoriValidationRules} = require('../middleware/validators/kategori');
const {validate} = require('../middleware/validation');

const router = express.Router();

router.post('/create', authenticate.validateAdmin, kategoriValidationRules() , validate, kategoriController.createKategori);

router.delete('/delete/:id', authenticate.validateAdmin, kategoriController.deleteKategoriByID);

router.get('/get/:id', kategoriController.getKategoriByID);

router.get('/get', kategoriController.getAllKategori);

router.put('/update/:id', authenticate.validateAdmin, kategoriValidationRules(), validate, kategoriController.updateKategoriById);

module.exports = router