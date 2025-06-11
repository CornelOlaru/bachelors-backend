require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database.js');
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const tableRoutes = require("./routes/tableRoutes.js");
const signupRoutes = require("./routes/signupRoutes");
const loginRoutes = require("./routes/loginRoutes")
const bodyParser = require("body-parser");


const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Server is running');
});


const startServer = async () => {
  const dbConnected = await connectDB();

  if (!dbConnected) {
    console.error('Exiting server due to DB connection failure');
    process.exit(1);
  }
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  
//API ROUTES

app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use("/api/tables", tableRoutes);
app.use("/user", signupRoutes);
app.use("/auth", loginRoutes);

};

startServer();


