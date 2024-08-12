import express from "express";
import authMiddleware from "../middleware/auth.js";
import { listOrders, placeOrder, userOrders, verifyOrder, updateStatus } from "../controllers/orderControllers.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder); // Placing an order requires authentication
orderRouter.post("/verify", verifyOrder); // Verifying an order, no authentication required
orderRouter.post("/userorders", authMiddleware, userOrders); // Fetching user-specific orders, requires authentication
orderRouter.get("/list", listOrders); // Listing all orders, no authentication required
orderRouter.post("/status", updateStatus); // Updating order status, no authentication required

export default orderRouter;
