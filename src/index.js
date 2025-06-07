require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database.js');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});


const startServer = async () => {
  const dbConnected = await connectDB();

  if (!dbConnected) {
    console.error('❌ Exiting server due to DB connection failure');
    process.exit(1);
  }
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  // continue with Express setup
};

startServer();


