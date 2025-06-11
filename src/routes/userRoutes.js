const express = require("express");

const cors = require("cors");

const userController = require("../controllers/userController");

const router = express.Router();
router.use(cors());


// Get all users
router.get("/", userController.getUsers);

//Find user by Id and update
router.put("/:id", userController.UpdateUser);

//Find user by Id
router.get("/:id", userController.getUserById);

//Delete user
router.put("/delete/:id", userController.deleteUser);

module.exports = router;
