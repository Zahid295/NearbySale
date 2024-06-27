const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// MongoDB database connection
mongoose.connect('mongodb://localhost:27017/your-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose models
const User = mongoose.model('User', {
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Product = mongoose.model('Product', {
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  imageUrl: { type: String },
});

const Order = mongoose.model('Order', {
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem', required: true }],
  totalAmount: { type: Number, required: true },
});

const OrderItem = mongoose.model('OrderItem', {
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
});

const adminJs = new AdminJS({
  resources: [
    {
      resource: User,
      options: {
        properties: {
          username: { type: 'string' },
          password: { type: 'password' }, 
        },
      },
    },
    {
      resource: Product,
      options: {
        properties: {
          name: { type: 'string' },
          description: { type: 'textarea' }, 
          price: { type: 'number' },
          imageUrl: { type: 'string' },
        },
      },
    },
    {
      resource: Order,
      options: {
        properties: {
          user: { type: 'reference', reference: 'User' },
          orderItems: { type: 'reference', reference: 'OrderItem' },
          totalAmount: { type: 'number' },
        },
      },
    },
    {
      resource: OrderItem,
      options: {
        properties: {
          user: { type: 'reference', reference: 'User' },
          product: { type: 'reference', reference: 'Product' },
          quantity: { type: 'number' },
        },
      },
    },
    
  ],
});

const router = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, router);

// Starting server
app.listen(3001, () => {
  console.log('Admin panel running on http://localhost:3001/admin');
});
