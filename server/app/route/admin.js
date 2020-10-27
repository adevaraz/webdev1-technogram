const express = require("express");

const adminController = require("../controller/admin");

const router = express.Router();

const authenticate = require('../middleware/adminAuth');

/*
    16 MN

  Route  Untuk signin Admin 
*/
router.post("/signin" , adminController.signin);

/*
    16 MN
    Route untuk signin admin
*/
router.post("/signout",authenticate , adminController.signout);

module.exports = router