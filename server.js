require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const app = express();


// =====================
// PORT CONFIG
// =====================

const PORT = process.env.PORT || 3000;


// =====================
// MIDDLEWARE
// =====================

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());


// =====================
// ROUTE IMPORTS
// =====================

const referenceRoutes = require("./routes/reference.routes");

const projectRoutes = require("./routes/project.routes");

const serviceRoutes = require("./routes/service.routes");

const userRoutes = require("./routes/users.routes");

const authRoutes = require("./routes/authRoutes");


// =====================
// ROUTE MIDDLEWARE
// =====================

app.use("/api/references", referenceRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/services", serviceRoutes);

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);


// =====================
// DATABASE CONNECTION
// =====================

const MONGO_URI =
 process.env.MONGO_URI ||
 "mongodb+srv://ShukuraAdesope:Raliat28@cluster0.luowsh6.mongodb.net/portfolio?retryWrites=true&w=majority";


mongoose
.connect(MONGO_URI, {

  useNewUrlParser: true,

  useUnifiedTopology: true

})
.then(()=>{

 console.log("✅ MongoDB connected successfully");

})
.catch((error)=>{

 console.log("❌ MongoDB connection error:");

 console.log(error.message);

});


// =====================
// ROOT ROUTE
// =====================

app.get("/", (req,res)=>{

 res.send("Portfolio API running successfully");

});


// =====================
// HEALTH CHECK ROUTE
// useful for Render monitoring
// =====================

app.get("/health", (req,res)=>{

 res.status(200).json({

  status:"OK",

  message:"Server running"

 });

});


// =====================
// GLOBAL ERROR HANDLER
// =====================

app.use((err,req,res,next)=>{

 console.error(err);

 res.status(err.status || 500).json({

  success:false,

  message: err.message || "Internal Server Error"

 });

});


// =====================
// START SERVER
// =====================

app.listen(PORT,()=>{

 console.log(`🚀 Server running on port ${PORT}`);

});