const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/jwtConfig.js");

function AuthenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid authorization format" });
  }

  jwt.verify(token, jwtSecret, { algorithms: ["HS256"] }, (err, user) => {
    if (err) {
      console.log("JWT verification error:", err.name, err.message);
      return res
        .status(403)
        .json({ message: "Forbidden: Invalid or expired token" });
    }
    req.user = user; //Decoded token payload (usually contains user data)
    next(); // Call the next middleware or route handler
  });
}

function verifyToken(token) {
    try {
        return jwt,verify(token, jwtSecret); //Use jwtSecret from config
    } catch (error) {
        console.log(error.message);
        throw new Error("Invalid token");
    }
}

// This middleware checks if the user has a specific role
function checkRole(role) {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Forbidden: No user role found" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: `Forbidden: Requires ${role} role` });
    }

    next(); // User has the required role, proceed to the next middleware or route handler
  };
}