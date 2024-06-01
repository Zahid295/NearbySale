// Import Express framework
const express = require('express');
const app = express();
// Connect to MongoDB Atlas
require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Connect to server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
