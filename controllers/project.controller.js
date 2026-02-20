const Project = require("../models/project");
const createError = require("http-errors");

// CREATE
exports.addProject = async (req, res, next) => {
  try {
    const project = new Project(req.body);
    const saved = await project.save();

    res.status(201).json({
      success: true,
      message: "Project added successfully.",
      data: {
        title: saved.title,
        completion: saved.completion,
        description: saved.description,
        id: saved._id
      }
    });
  } catch (err) {
    next(err);
  }
};

// GET ALL
exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();

    const formatted = projects.map(proj => ({
      title: proj.title,
      completion: proj.completion,
      description: proj.description,
      id: proj._id
    }));

    res.json({
      success: true,
      message: "Projects list retrieved successfully.",
      data: formatted
    });
  } catch (err) {
    next(err);
  }
};

// GET BY ID
exports.getProjectById = async (req, res, next) => {
  try {
    const proj = await Project.findById(req.params.id);
    if (!proj) return next(createError(404, "Project not found"));

    res.json({
      success: true,
      message: "Project retrieved successfully.",
      data: {
        title: proj.title,
        completion: proj.completion,
        description: proj.description,
        id: proj._id
      }
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.updateProject = async (req, res, next) => {
  try {
    await Project.findByIdAndUpdate(req.params.id, req.body);

    res.json({
      success: true,
      message: "Project updated successfully."
    });
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.deleteProject = async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Project deleted successfully."
    });
  } catch (err) {
    next(err);
  }
};
