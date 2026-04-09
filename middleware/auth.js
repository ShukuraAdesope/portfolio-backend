const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

 try {

  // get token from header
  const authHeader = req.headers.authorization;

  // check if header exists
  if (!authHeader) {

   return res.status(401).json({

    success: false,
    message: "Access denied. No token provided."

   });

  }

  // remove Bearer from token
  const token = authHeader.split(" ")[1];

  // check if token exists
  if (!token) {

   return res.status(401).json({

    success: false,
    message: "Token missing."

   });

  }

  // verify token
  const decoded = jwt.verify(

   token,
   process.env.JWT_SECRET || "comp229secretkey"

  );

  // attach user data to request
  req.user = decoded;

  next();

 }
 catch (error) {

  return res.status(401).json({

   success: false,
   message: "Invalid or expired token."

  });

 }

};