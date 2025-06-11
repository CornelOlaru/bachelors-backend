const express = require("express");
const cors = require("cors");
const loginController = require("../controllers/loginController");

const router = express.Router();

router.use(cors());

router.post("/login", loginController.login);
router.post("/refresh-token", loginController.refreshToken);

module.exports = router;