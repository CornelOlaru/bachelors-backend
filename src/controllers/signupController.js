const userService = require("../services/signupSevice");
//Create user function
exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    res.status(201).json({ user: user, message: "User created succesfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
