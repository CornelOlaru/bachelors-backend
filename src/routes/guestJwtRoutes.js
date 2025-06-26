const express = require("express");
const guestService = require("../services/guestService");
const router = express.Router();

router.post("/",guestService.guestJwtCheck)

module.exports = router;