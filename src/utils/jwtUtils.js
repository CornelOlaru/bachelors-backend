const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/jwtConfig");

function generateToken(user) {
    
    try {
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
        const options = {
            expiresIn: "1h",
            
        };
        
        
   return jwt.sign(payload,jwtSecret, options);

  } catch (error) {
    console.error("Error signing JWT", error);
    throw new Error("Unable to sign JWT");
  }
}

module.exports = {
  generateToken
};
