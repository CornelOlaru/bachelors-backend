const Table = require("../models/tableModel");
const qrCode = require("qrcode");
require("dotenv").config()
//Create table
exports.createTable = async (req, res) => {
    try {
        const {number} = req.body;
        //Check if table is existing already
        const existingTable = await Table.findOne({number});
        
        if (existingTable) {
         console.log("This is the existing table",existingTable)
          return res.status(400).json({message: "This table already exists"});
        }

        const table = new Table({number});
        await table.save();

        //Generating QR-Code URL
        const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

        const tableUrl = `${FRONTEND_URL}/table/${table._id}`;
        

        //Generating QR image base64
        const qrCodeUrl = await qrCode.toDataURL(tableUrl);
        
        table.qrCodeUrl = qrCodeUrl;
        await table.save();
        
        res.status(201).json(table);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Get all tables
exports.getTables = async (req, res) => {
    try {
      const tables = await Table.find({ deleted: false });
      res.status(200).json(tables);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Eroare la preluarea meselor.' });
    }
  };

//Get tables by ID
exports.getTableById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const table = await Table.findOne({ _id: id, deleted: false });
  
      if (!table) {
        return res.status(400).json({ message: 'Table could not be found' });
      }
  
      res.status(200).json(table);
    } catch (err) {
      console.error({message: "Error finding table"});
      res.status(500).json({ message: 'Internal server error' });
    }
  };

//Update Table
exports.updateTable = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      const table = await Table.findOneAndUpdate(
        { _id: id, deleted: false },
        updates,
        { new: true }
      );
  
      if (!table) {
        return res.status(404).json({ message: 'Table could not be found or it was deleted' });
      }
  
      res.status(200).json(table);
    } catch (err) {
        console.error({message: "Error updating table"});
        res.status(500).json({ message: 'Internal server error' });
    }
  };

  //Delete table
  exports.deleteTable = async (req, res) => {
    try {
      const { id } = req.params;
  
      const table = await Table.findOneAndUpdate(
        { _id: id, deleted: false },
        {
          deleted: true,
          deletedAt: new Date(),
        },
        { new: true }
      );
  
      if (!table) {
        return res.status(404).json({ message: 'Table could not be found or it was already deleted' });
      }
  
      res.status(200).json({ message: 'Table deleted successfully!', table });
    } catch (err) {
      console.error({message: "Error deleting table"});
      res.status(500).json({ message: 'Internal server error' });
    }
  };