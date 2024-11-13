import Order from "../models/orderModel.js ";
import User from "../models/userModel.js";

const PlaceOrderCOD = async (req, res) => {
  try {
    const { userId } = req.user;
    const { items, amount, address } = req.body;

    const newOrderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: true,
      date: Date.now(),
    };

    const newOrder = await Order.create(newOrderData);

    // clear cart items once order placed
    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({ success: true, message: "Order placed", newOrder });
  } catch (error) {
    console.error("Error placing cash on delivery order: ", error);
    res.status(500).json({ success: false, message: "Error placing Order" });
  }
};

const PlaceOrderStripe = async (req, res) => {};

const PlaceOrderRazorpay = async (req, res) => {};

// get orders for admin panel
const getAllOrders = async (req, res) => {};

// get user orders for client
const getUserOrders = async (req, res) => {};

// update order status from admin panel
const updateOrderStatus = async (req, res) => {};

export {
  PlaceOrderCOD,
  PlaceOrderStripe,
  PlaceOrderRazorpay,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
};
