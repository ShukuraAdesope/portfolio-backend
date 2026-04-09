console.log("Reference routes loaded");

const express = require("express");

const router = express.Router();

const referenceController = require("../controllers/reference.controller");

const auth = require("../middleware/auth");


// ======================
// PUBLIC ROUTES
// ======================

// view all references
router.get("/", referenceController.getAllReferences);

// view one reference
router.get("/:id", referenceController.getReferenceById);


// ======================
// PROTECTED ROUTES
// login required
// ======================

// create reference
router.post("/", auth, referenceController.addReference);

// update reference
router.put("/:id", auth, referenceController.updateReference);

// delete reference
router.delete("/:id", auth, referenceController.deleteReference);


module.exports = router;