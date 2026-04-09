const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({

 firstname:{
  type:String,
  required:true,
  trim:true
 },

 lastname:{
  type:String,
  required:true,
  trim:true
 },

 email:{
  type:String,
  required:true,
  unique:true,
  lowercase:true,
  trim:true
 },

 password:{
  type:String,
  required:true,
  minlength:6
 },

 created:{
  type:Date,
  default:Date.now
 },

 updated:{
  type:Date,
  default:Date.now
 }

});


// ======================
// HASH PASSWORD BEFORE SAVE
// ======================

userSchema.pre("save", async function(next){

 try{

  // only hash if password changed
  if(!this.isModified("password")){

   return next();

  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);

  next();

 }
 catch(error){

  next(error);

 }

});


// ======================
// UPDATE TIMESTAMP
// ======================

userSchema.pre("save", function(next){

 this.updated = Date.now();

 next();

});


module.exports = mongoose.model("User", userSchema);