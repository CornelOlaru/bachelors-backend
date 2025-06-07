require("dotenv").config();

const mongoose = require("mongoose");

// Suprimă avertizarea deprecației strictQuery
mongoose.set('strictQuery', true);

const dbURL = process.env.DB_URL;
//console.log('DB_URL:', dbURL); // Verifică dacă DB_URL este definită

const connectDB = async () => {
    if (!dbURL) {
    
  console.error('DB_URL not defined in environment variables');
        return false;
    
}
try {
    await mongoose.connect(dbURL);
    console.log('Database connected successfully');
    return true;
} catch (error) {
    console.error('Database connection error:', error);
    return false;
}
};



module.exports = connectDB;