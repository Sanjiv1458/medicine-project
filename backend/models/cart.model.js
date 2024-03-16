import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1, min: 1 },
  }],
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }, // Added index for user
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
