const Service = require("../models/service");
const createError = require("http-errors");

// CREATE
exports.addService = async (req, res, next) => {
  try {
    const service = new Service(req.body);
    const saved = await service.save();

    res.status(201).json({
      success: true,
      message: "Service added successfully.",
      data: {
        title: saved.title,
        description: saved.description,
        id: saved._id
      }
    });
  } catch (err) {
    next(err);
  }
};

// GET ALL
exports.getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();

    const formatted = services.map(serv => ({
      title: serv.title,
      description: serv.description,
      id: serv._id
    }));

    res.json({
      success: true,
      message: "Services list retrieved successfully.",
      data: formatted
    });
  } catch (err) {
    next(err);
  }
};

// GET BY ID
exports.getServiceById = async (req, res, next) => {
  try {
    const serv = await Service.findById(req.params.id);
    if (!serv) return next(createError(404, "Service not found"));

    res.json({
      success: true,
      message: "Service retrieved successfully.",
      data: {
        title: serv.title,
        description: serv.description,
        id: serv._id
      }
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.updateService = async (req, res, next) => {
  try {
    await Service.findByIdAndUpdate(req.params.id, req.body);

    res.json({
      success: true,
      message: "Service updated successfully."
    });
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.deleteService = async (req, res, next) => {
  try {
    await Service.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Service deleted successfully."
    });
  } catch (err) {
    next(err);
  }
};
