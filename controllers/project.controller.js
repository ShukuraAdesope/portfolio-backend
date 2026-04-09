const Project = require("../models/project");

const createError = require("http-errors");


// ======================
// CREATE PROJECT
// ======================

exports.addProject = async (req, res, next) => {

 try {

  const project = new Project({

   title: req.body.title,

   completion: req.body.completion,

   description: req.body.description

  });

  const saved = await project.save();

  res.status(201).json({

   success: true,

   message: "Project added successfully.",

   data: {

    id: saved._id,

    title: saved.title,

    completion: saved.completion,

    description: saved.description

   }

  });

 }
 catch (err) {

  next(err);

 }

};



// ======================
// GET ALL PROJECTS
// ======================

exports.getAllProjects = async (req, res, next) => {

 try {

  const projects = await Project.find()

   .sort({ created: -1 });


  const formatted = projects.map(proj => ({

   id: proj._id,

   title: proj.title,

   completion: proj.completion,

   description: proj.description

  }));


  res.json({

   success: true,

   message: "Projects retrieved successfully.",

   data: formatted

  });

 }
 catch (err) {

  next(err);

 }

};



// ======================
// GET PROJECT BY ID
// ======================

exports.getProjectById = async (req, res, next) => {

 try {

  const project = await Project.findById(

   req.params.id

  );


  if (!project) {

   return next(

    createError(404, "Project not found")

   );

  }


  res.json({

   success: true,

   message: "Project retrieved successfully.",

   data: {

    id: project._id,

    title: project.title,

    completion: project.completion,

    description: project.description

   }

  });

 }
 catch (err) {

  next(err);

 }

};



// ======================
// UPDATE PROJECT
// ======================

exports.updateProject = async (req, res, next) => {

 try {

  const updated = await Project.findByIdAndUpdate(

   req.params.id,

   req.body,

   {

    new: true,

    runValidators: true

   }

  );


  if (!updated) {

   return next(

    createError(404, "Project not found")

   );

  }


  res.json({

   success: true,

   message: "Project updated successfully.",

   data: {

    id: updated._id,

    title: updated.title,

    completion: updated.completion,

    description: updated.description

   }

  });

 }
 catch (err) {

  next(err);

 }

};



// ======================
// DELETE PROJECT
// ======================

exports.deleteProject = async (req, res, next) => {

 try {

  const deleted = await Project.findByIdAndDelete(

   req.params.id

  );


  if (!deleted) {

   return next(

    createError(404, "Project not found")

   );

  }


  res.json({

   success: true,

   message: "Project deleted successfully."

  });

 }
 catch (err) {

  next(err);

 }

};