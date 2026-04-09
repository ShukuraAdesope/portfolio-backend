const express = require("express");

const router = express.Router();

const projectController = require("../controllers/project.controller");

const auth = require("../middleware/auth");


// ======================
// PUBLIC ROUTES
// ======================

// get all projects
router.get("/", projectController.getAllProjects);

// get single project
router.get("/:id", projectController.getProjectById);


// ======================
// PROTECTED ROUTES
// require login token
// ======================

// create project
router.post("/", auth, projectController.addProject);

// update project
router.put("/:id", auth, projectController.updateProject);

// delete project
router.delete("/:id", auth, projectController.deleteProject);


module.exports = router;