import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const placeOrder = async (req, res) => {
  try {
    // Create a new order in your database
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      razorpayOrderId: null // Initialize if needed
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Amount in paise
    const amount = (req.body.amount + 2) * 100; // Adding delivery charges

    // Create an order in Razorpay
    const options = {
      amount: amount, // amount in paise
      currency: "INR",
      receipt: newOrder._id.toString(),
      payment_capture: 1, // 1 for automatic capture, 0 for manual capture
    };

    const order = await razorpay.orders.create(options);

    // Update the order with Razorpay order ID
    newOrder.razorpayOrderId = order.id;
    await newOrder.save();

    res.json({
      success: true,
      orderId: newOrder._id, // Can also return customId if needed
      razorpayOrderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID, // Send key_id to the client
    });
  } catch (error) {
    console.log("Error placing order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    // Use the appropriate field to identify the order
    const updateData = { payment: success === "true" };

    if (success === "true") {
      await orderModel.findOneAndUpdate({ razorpayOrderId: orderId }, updateData); // Adjust query to use custom ID
      res.json({ success: true, message: "Payment successful" });
    } else {
      await orderModel.findOneAndDelete({ razorpayOrderId: orderId }); // Adjust query to use custom ID
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log("Error verifying order:", error);
    res.status(500).json({ success: false, message: "Error verifying order" });
  }
};


const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching user orders" });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error updating status" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
