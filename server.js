const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Assuming you have a User model
const Product = require('./components/Product');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB Atlas
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err));

// Middleware
app.use(cors());
app.use(express.json());

// User and Admin Registration route
app.post('/register', async (req, res) => {
  const { username, password, isAdmin } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, password: hashedPassword, isAdmin });

    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error registering user' });
  }
});

// User and Admin Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = { user: { id: user.id } };
    const expiresIn = user.isAdmin ? '1d' : '1h'; // Adjust token expiration based on user type

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: 'Error logging in' });
  }
});

// Logout route
app.post('/logout', (req, res) => {
  // Clear authentication data (e.g., JWT token, session)
  // For example, if using cookies:
  res.clearCookie('jwtToken'); // Replace with your actual cookie name
  res.json({ message: 'Logged out successfully' });
});

// Create a route to handle POST requests for adding products
app.post('/products', async (req, res) => {
  try {
    // Assuming req.body contains the product data
    const { name, description, price, imageUrl } = req.body;

    // Create a new product
    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl,
    });

    // Save the product to MongoDB
    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




