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

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// User Registration route
const bcrypt = require('bcryptjs');
const User = require('./models/user');

app.use(express.json()); 

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  let user = await User.findOne({ username });
  if (user) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  user = new User({ username, password });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  res.send('User registered');
});

// Login route
const jwt = require('jsonwebtoken');

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  let user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ msg: 'Invalid Credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: 'Invalid Credentials' });
  }

  const payload = { user: { id: user.id } };
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
    if (err) throw err;
    res.json({ token });
  });
});

// Route for items
const Item = require('./models/item'); 

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



