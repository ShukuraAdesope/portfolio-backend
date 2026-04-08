require("dotenv").config(); // load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const app = express();


// =====================
// PORT
// =====================
const PORT = process.env.PORT || 3000;


// =====================
// MIDDLEWARE
// =====================
app.use(cors());

app.use(morgan("dev"));

app.use(express.json());


// =====================
// ROUTES IMPORT
// =====================
const referenceRoutes = require("./routes/reference.routes");

const projectRoutes = require("./routes/project.routes");

const serviceRoutes = require("./routes/service.routes");

const userRoutes = require("./routes/users.routes");

const authRoutes = require("./routes/auth.routes"); // authentication routes


// =====================
// ROUTES USE
// =====================

app.use("/api/references", referenceRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/services", serviceRoutes);

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes); // signup & signin routes


// =====================
// DATABASE CONNECTION
// =====================

const MONGO_URI = process.env.MONGO_URI;


mongoose
.connect(MONGO_URI)
.then(() => {

 console.log("✅ MongoDB connected");

})
.catch((error) => {

 console.log("❌ MongoDB connection error");

 console.log(error);

});


// =====================
// ROOT ROUTE
// =====================

app.get("/", (req,res)=>{

 res.send("Portfolio API running");

});


// =====================
// ERROR HANDLER
// =====================

app.use((err,req,res,next)=>{

 res.status(err.status || 500).json({

  success:false,

  message:err.message || "Server Error"

 });

});


// =====================
// START SERVER
// =====================

app.listen(PORT,()=>{

 console.log(`🚀 Server running on port ${PORT}`);

});