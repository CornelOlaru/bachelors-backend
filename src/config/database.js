require("dotenv").config();

const mongoose = require("mongoose");

// Suppress the strictQuery deprecation warning and ensure 
// that only fields defined in the schema are allowed in query filters
mongoose.set('strictQuery', true);

const dbURL = process.env.DB_URL;

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