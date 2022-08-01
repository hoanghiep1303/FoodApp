const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const filterRoutes = require('./routes/filter');


connectDB();
dotenv.config();

app.get('/', (req, res) => {
    res.send("Hello World");
})

//Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});


app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/filter', filterRoutes);