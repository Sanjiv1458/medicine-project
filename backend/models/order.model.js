import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1, min: 1 },
  }],
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }, // Added index for user
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
