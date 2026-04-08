const express = require('express');

const router = express.Router();

const projectController = require('../controllers/project.controller');

const auth = require('../middleware/auth');


// public routes
router.get('/', projectController.getAllProjects);

router.get('/:id', projectController.getProjectById);


// protected routes
router.post('/', auth, projectController.addProject);

router.put('/:id', auth, projectController.updateProject);

router.delete('/:id', auth, projectController.deleteProject);


module.exports = router;