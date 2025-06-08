const User = require('../models/userModel');

// Get all existing users
exports.getUsers = async (req, res) => {
    try {
      const users = await User.find({ deleted: false });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  //Get all users including deleted
  exports.getAllUsersIncludingDeleted = async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  
  //Get a user by Id
exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User id not valid" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  //Soft Delete User
exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: { deleted: true } },
        { new: true }
      );
      console.log("Updated User:", user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User soft deleted", user });
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };


  //Update user
exports.UpdateUser = async (req, res) => {
    try {
      const updates = req.body;
      if ("deleted" in updates) {
        return res
          .status(400)
          .json({ message: 'Cannor directly update the "deleted" field' });
      }
      const user = await User.findByIdAndUpdate(req.params.id, updates, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ message: "User id not valid" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  