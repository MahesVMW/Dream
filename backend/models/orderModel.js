import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: Object, required: true }],
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Product Ordered" },
  date: { type: Date, default: Date.now },
  payment: { type: Boolean, default: false },
  razorpayOrderId: { type: String, required: false } // Make it optional if needed
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
