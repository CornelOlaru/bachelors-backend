const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");

exports.createUser = async (userData) => {
  const { firstName, lastName, email, password } = userData;
  const existingUser = await User.findOne({ email }); //Checking if user exists
  if (existingUser) {
    throw new Error("User already exists");
  }
  if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
    throw Error("All fields required!");
  }
  if (!validator.isEmail(userData.email)) {
    throw Error("Email is not valid!");
  } 
  else if (!validator.isStrongPassword(userData.password)) {
    throw Error("Password is not valid!");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  const savedUser = await createdUser.save();
  return savedUser;
}
