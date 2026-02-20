const Reference = require("../models/reference");
const createError = require("http-errors");

// CREATE
exports.addReference = async (req, res, next) => {
  try {
    const reference = new Reference(req.body);
    const saved = await reference.save();

    res.status(201).json({
      success: true,
      message: "Reference added successfully.",
      data: {
        firstname: saved.firstname,
        lastname: saved.lastname,
        email: saved.email,
        position: saved.position,
        company: saved.company,
        id: saved._id
      }
    });
  } catch (err) {
    next(err);
  }
};

// GET ALL
exports.getAllReferences = async (req, res, next) => {
  try {
    const references = await Reference.find();

    const formatted = references.map(ref => ({
      firstname: ref.firstname,
      lastname: ref.lastname,
      email: ref.email,
      position: ref.position,
      company: ref.company,
      id: ref._id
    }));

    res.json({
      success: true,
      message: "References list retrieved successfully.",
      data: formatted
    });
  } catch (err) {
    next(err);
  }
};

// GET BY ID
exports.getReferenceById = async (req, res, next) => {
  try {
    const ref = await Reference.findById(req.params.id);

    if (!ref) return next(createError(404, "Reference not found"));

    res.json({
      success: true,
      message: "Reference retrieved successfully.",
      data: {
        firstname: ref.firstname,
        lastname: ref.lastname,
        email: ref.email,
        position: ref.position,
        company: ref.company,
        id: ref._id
      }
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.updateReference = async (req, res, next) => {
  try {
    await Reference.findByIdAndUpdate(req.params.id, req.body);

    res.json({
      success: true,
      message: "Reference updated successfully."
    });
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.deleteReference = async (req, res, next) => {
  try {
    await Reference.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Reference deleted successfully."
    });
  } catch (err) {
    next(err);
  }
};
