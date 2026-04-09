const Reference = require("../models/reference");

const createError = require("http-errors");


// ======================
// CREATE REFERENCE
// ======================

exports.addReference = async (req, res, next) => {

 try {

  const reference = new Reference({

   firstname: req.body.firstname,

   lastname: req.body.lastname,

   email: req.body.email,

   position: req.body.position,

   company: req.body.company

  });


  const saved = await reference.save();


  res.status(201).json({

   success: true,

   message: "Reference added successfully.",

   data: {

    id: saved._id,

    firstname: saved.firstname,

    lastname: saved.lastname,

    email: saved.email,

    position: saved.position,

    company: saved.company

   }

  });

 }
 catch (err) {

  next(err);

 }

};



// ======================
// GET ALL REFERENCES
// ======================

exports.getAllReferences = async (req, res, next) => {

 try {

  const references = await Reference.find().sort({ created: -1 });


  const formatted = references.map(ref => ({

   id: ref._id,

   firstname: ref.firstname,

   lastname: ref.lastname,

   email: ref.email,

   position: ref.position,

   company: ref.company

  }));


  res.json({

   success: true,

   message: "References retrieved successfully.",

   data: formatted

  });

 }
 catch (err) {

  next(err);

 }

};



// ======================
// GET REFERENCE BY ID
// ======================

exports.getReferenceById = async (req, res, next) => {

 try {

  const reference = await Reference.findById(req.params.id);


  if (!reference) {

   return next(

    createError(404, "Reference not found")

   );

  }


  res.json({

   success: true,

   message: "Reference retrieved successfully.",

   data: {

    id: reference._id,

    firstname: reference.firstname,

    lastname: reference.lastname,

    email: reference.email,

    position: reference.position,

    company: reference.company

   }

  });

 }
 catch (err) {

  next(err);

 }

};



// ======================
// UPDATE REFERENCE
// ======================

exports.updateReference = async (req, res, next) => {

 try {

  const updated = await Reference.findByIdAndUpdate(

   req.params.id,

   req.body,

   {

    new: true,

    runValidators: true

   }

  );


  if (!updated) {

   return next(

    createError(404, "Reference not found")

   );

  }


  res.json({

   success: true,

   message: "Reference updated successfully.",

   data: {

    id: updated._id,

    firstname: updated.firstname,

    lastname: updated.lastname,

    email: updated.email,

    position: updated.position,

    company: updated.company

   }

  });

 }
 catch (err) {

  next(err);

 }

};



// ======================
// DELETE REFERENCE
// ======================

exports.deleteReference = async (req, res, next) => {

 try {

  const deleted = await Reference.findByIdAndDelete(

   req.params.id

  );


  if (!deleted) {

   return next(

    createError(404, "Reference not found")

   );

  }


  res.json({

   success: true,

   message: "Reference deleted successfully."

  });

 }
 catch (err) {

  next(err);

 }

};