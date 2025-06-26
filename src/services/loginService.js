const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { generateToken } = require("../utils/jwtUtils");
const { verifyToken } = require("../utils/authMiddleware");


exports.login = async (email, password) =>  {
  try {
    const existingUser = await User.findOne({ email }); //Checking if user exists
    if (!existingUser) {
      throw new Error("User not found");
    }
    //Comparing input password with db password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password); 
    if (!isPasswordValid) {
      throw new Error("Incorrect password");
    }
    const token = generateToken(existingUser); // Generating token
    //Check if token is valid
    if (!token) {
      throw new Error("Failed to generate token")
    }
    return token;
  } catch (error) {
    console.log("Login error: ", error.message);
    throw new Error("Invalid Credetials");
  }
}


exports.refreshToken = async (oldToken) => {
  try {
//Check if the old token is valid
if (!oldToken) {
  throw new Error("Invalid token")
}

    const decodedToken = verifyToken(oldToken);
    const user = User.findById(decodedToken._id);
    if (!user) {
      throw new error("User not found");
    };

    const newToken = generateToken(user); // Generating token
    // Check if the new token is valid
    if (!newToken) {
      throw new Error("Failed to generate token")
    }
    return newToken;
  } catch (error) {
    
    throw new error("Invalid token");
  }
}

