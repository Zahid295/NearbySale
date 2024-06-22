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

// Admin Routes for handling products
// Admin route to view all products
router.get('/admin/products', async (req, res) => {
  try {
    // Retrieve products from the database
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Admin route to add a new product
router.post('/admin/products', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    // Save a new product
    const newProduct = new Product({ name, description, price });
    await newProduct.save();
    res.json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product' });
  }
});

// Admin route to update product details
router.put('/admin/products/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price } = req.body;
    // Modify product details
    await Product.findByIdAndUpdate(productId, { name, description, price });
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

// Admin route to delete a product
router.delete('/admin/products/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    // Remove the product
    await Product.findByIdAndDelete(productId);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// Admin Routes for handling Users
// Admin route to view all users
router.get('/admin/users', async (req, res) => {
  try {
    // Retrieve users from the database
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Admin route to update user details
router.put('/admin/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email } = req.body;
    // Modify user details
    await User.findByIdAndUpdate(userId, { username, email });
    res.json({ message: 'User details updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user details' });
  }
});

// Admin route to delete a user
router.delete('/admin/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    // Remove the user
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// Admin Routes to handle Orders
// Admin route to view all orders
router.get('/admin/orders', async (req, res) => {
  try {
    // Retrieve orders from the database
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Admin route to update order status
router.put('/admin/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    // Modify order status
    await Order.findByIdAndUpdate(orderId, { status });
    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status' });
  }
});

// Admin route to cancel an order
router.delete('/admin/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    // Update the order as canceled
    await Order.findByIdAndUpdate(orderId, { status: 'canceled' });
    res.json({ message: 'Order canceled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error canceling order' });
  }
});

module.exports = router;
