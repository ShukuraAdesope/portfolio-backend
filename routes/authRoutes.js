const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");


// ======================
// AUTH ROUTES
// ======================


// create account
router.post("/signup", authController.signup);


// login user
router.post("/signin", authController.signin);


module.exports = router;