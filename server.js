require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Use Render port or default to 3000
const PORT = process.env.PORT || 3000;

// =====================
// Middleware
// =====================
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// =====================
// Routes
// =====================
const referenceRoutes = require("./routes/reference.routes");
const projectRoutes = require("./routes/project.routes");
const serviceRoutes = require("./routes/service.routes");
const userRoutes = require("./routes/users.routes");

app.use("/api/references", referenceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);

// =====================
// MongoDB Connection
// =====================

// Use environment variable if available, otherwise use local fallback
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://ShukuraAdesope:Raliat28@cluster0.luowsh6.mongodb.net/portfolio?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// =====================
// Root Route
// =====================
app.get("/", (req, res) => {
  res.send("API is running...");
});

// =====================
// Global Error Handler
// =====================
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// =====================
// Start Server
// =====================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});