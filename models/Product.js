const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  // Add other relevant fields (e.g., brand, category)
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;