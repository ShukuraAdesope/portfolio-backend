const User = require("../models/user");
const createError = require("http-errors");

// CREATE
exports.addUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const saved = await user.save();

    res.status(201).json({
      success: true,
      message: "User added successfully.",
      data: {
        firstname: saved.firstname,
        lastname: saved.lastname,
        email: saved.email,
        password: saved.password,
        created: saved.created,
        updated: saved.updated,
        id: saved._id
      }
    });
  } catch (err) {
    next(err);
  }
};

// GET ALL
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    const formatted = users.map(user => ({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      created: user.created,
      updated: user.updated,
      id: user._id
    }));

    res.json({
      success: true,
      message: "Users list retrieved successfully.",
      data: formatted
    });
  } catch (err) {
    next(err);
  }
};

// GET BY ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found"));

    res.json({
      success: true,
      message: "User retrieved successfully.",
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        created: user.created,
        updated: user.updated,
        id: user._id
      }
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.updateUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);

    res.json({
      success: true,
      message: "User updated successfully."
    });
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "User deleted successfully."
    });
  } catch (err) {
    next(err);
  }
};
