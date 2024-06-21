const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  // Add other relevant fields (e.g., price per unit)
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;