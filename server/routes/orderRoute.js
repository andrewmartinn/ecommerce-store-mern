import express from "express";
import {
  getAllOrders,
  getUserOrders,
  handleStripeWebhook,
  PlaceOrderCOD,
  PlaceOrderStripe,
  updateOrderStatus,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// @Admin Routes
orderRouter.get("/admin/orders", adminAuth, getAllOrders);
orderRouter.patch("/status", adminAuth, updateOrderStatus);

// @User Payment Routes
orderRouter.post("/cod", authUser, PlaceOrderCOD);
orderRouter.post("/stripe", authUser, PlaceOrderStripe);

// @User Stripe Webhook
orderRouter.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

// @User Orders Routes
orderRouter.get("/user/orders", authUser, getUserOrders);

export default orderRouter;
