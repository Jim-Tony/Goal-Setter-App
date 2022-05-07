const express =  require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const app = express();
connectDB();
app.use(express.json()); 
app.use(                
  express.urlencoded({
    extended: true,
  })
);
app.use('/api/goals',require('./routes/goalRoutes'));
app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port,()=>console.log(`Server listening on port ${port}`));