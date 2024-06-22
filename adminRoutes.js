const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt'); 
const User = require('../models/User'); 

// Admin route for Registration
router.post('/admin/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verify if the username is already been used
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Use Hash for password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin user
    const newUser = new User({ username, password: hashedPassword, isAdmin: true });
    await newUser.save();

    res.json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering admin' });
  }
});

// Admin route for login
router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate credentials if user is an admin
    const adminUser = await User.findOne({ username, isAdmin: true });
    if (!adminUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, adminUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token after successful login
    const token = jwt.sign({ userId: adminUser._id }, 'your-secret-key', {
      expiresIn: '1h', // Set an appropriate expiration time
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Admin route for logout
router.post('/admin/logout', (req, res) => {
  // Clean authentication data (For example, JWT token, session)
  res.redirect('/admin/login');
});

module.exports = router;
