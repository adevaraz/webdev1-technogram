const express = require("express");
const kategoriController = require("../controller/kategori");
const authenticate = require('../middleware/authentication');
const {kategoriValidationRules, kategoriValidate} = require('../middleware/validators/kategori');
const uploadPhotoCat = require('../middleware/uploadImageKategori');

const router = express.Router();

router.post('/create', authenticate.validateAdmin, uploadPhotoCat.imageUpload, kategoriValidationRules() , kategoriValidate, kategoriController.createKategori);

router.delete('/delete/:id', authenticate.validateAdmin, kategoriController.deleteKategoriByID);

router.get('/get/:id', kategoriController.getKategoriByID);

router.get('/get', kategoriController.getAllKategori);

router.put('/update/:id', authenticate.validateAdmin, uploadPhotoCat.imageUpload, kategoriValidationRules(), kategoriValidate, kategoriController.updateKategoriById);

router.get('/get-id', kategoriController.getByName);

module.exports = router