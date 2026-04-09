const mongoose = require("mongoose");

const referenceSchema = new mongoose.Schema({

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
  lowercase:true,
  trim:true
 },

 position:{
  type:String,
  required:true,
  trim:true
 },

 company:{
  type:String,
  required:true,
  trim:true
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


// automatically update updated field
referenceSchema.pre("save", function(next){

 this.updated = Date.now();

 next();

});


module.exports = mongoose.model("Reference", referenceSchema);