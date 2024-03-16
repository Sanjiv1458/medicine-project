import mongoose from 'mongoose';

const productEnquirySchema = new mongoose.Schema({
  product: String,
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  quantity: { type: Number, required: true },
  viewed: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductEnquiry = mongoose.model('ProductEnquiry', productEnquirySchema);

export default ProductEnquiry;
