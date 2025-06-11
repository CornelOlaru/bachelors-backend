const express = require("express");
const tableController = require("../controllers/tableController");

const router = express.Router();


//Create table
router.post("/", tableController.createTable);

//Get all tables
router.get('/', tableController.getTables);

//Get table by ID
router.get("/:id", tableController.getTableById);

//Update table
router.put("/:id", tableController.updateTable);

//Soft delete table
router.put("/delete/:id", tableController.deleteTable);

module.exports = router;