const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");


// signup
router.post("/signup", authController.signup);


// signin
router.post("/signin", authController.signin);


module.exports = router;