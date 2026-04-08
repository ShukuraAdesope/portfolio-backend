const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// SIGN UP
exports.signup = async(req,res)=>{

 try{

  const user = new User({

   firstname:req.body.firstname,
   lastname:req.body.lastname,
   email:req.body.email,
   password:req.body.password

  });

  await user.save();

  res.status(201).json({

   message:"User created successfully"

  });

 }
 catch(error){

  res.status(500).json({

   message:error.message

  });

 }

};




// SIGN IN
exports.signin = async(req,res)=>{

 try{

  const user = await User.findOne({

   email:req.body.email

  });

  if(!user){

   return res.status(404).json({

    message:"User not found"

   });

  }


  const validPassword = await bcrypt.compare(

   req.body.password,
   user.password

  );

  if(!validPassword){

   return res.status(401).json({

    message:"Invalid password"

   });

  }


  const token = jwt.sign(

   {

    id:user._id,
    email:user.email

   },

   process.env.JWT_SECRET,

   {

    expiresIn:"24h"

   }

  );


  res.json({

   message:"Login successful",

   token

  });

 }
 catch(error){

  res.status(500).json({

   message:error.message

  });

 }

};