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
const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find({});

    if (!allOrders) {
      return res
        .status(400)
        .json({ success: false, message: "Unable to fetch orders" });
    }

    res.status(200).json({ success: true, allOrders });
  } catch (error) {
    console.error("Error fetching admin orders: ", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching admin orders" });
  }
};

// get user orders for client
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.user;

    const userOrders = await Order.find({ userId });

    if (!userOrders) {
      return res
        .status(400)
        .json({ success: false, message: "User does not have any orders yet" });
    }

    res.status(200).json({ success: true, userOrders });
  } catch (error) {
    console.error("Unable to get user orders: ", error);
    res
      .status(500)
      .json({ success: true, message: "Unable to get user orders" });
  }
};

// update order status from admin panel
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: orderStatus },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Order status updated", updatedOrder });
  } catch (error) {
    console.error("Error updating order status: ", error);
    res
      .status(500)
      .json({ success: false, message: "Error updating order status" });
  }
};

export {
  PlaceOrderCOD,
  PlaceOrderStripe,
  PlaceOrderRazorpay,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
};
