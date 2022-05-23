const express =  require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const path = require('path');
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
app.use('/api/users',require('./routes/userRoutes'));
// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}
app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port,()=>console.log(`Server listening on port ${port}`));