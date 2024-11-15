import Order from "../models/orderModel.js ";
import User from "../models/userModel.js";
import Stripe from "stripe";

// global checkout variables
const currency = "usd";
const deliveryCharges = 10;

// initialize stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

const PlaceOrderStripe = async (req, res) => {
  try {
    const { userId } = req.user;
    const { origin } = req.headers;
    const { items, amount, address } = req.body;

    const newOrderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newStripeOrder = await Order.create(newOrderData);
    console.log(newStripeOrder);

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // delivery fee
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });

    // create checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/verify?success=true&orderId=${newStripeOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newStripeOrder._id}`,
      metadata: {
        orderId: newStripeOrder._id,
      },
    });

    res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error processing stripe payment: ", error);
    res
      .status(500)
      .json({ success: false, message: "Error processing stripe payment" });
  }
};

const verifyStripePayment = async (req, res) => {
  try {
    const { userId } = req.user;
    const { orderId, success } = req.body;

    if (success === "true") {
      const verifiedStripeOrder = await Order.findByIdAndUpdate(
        orderId,
        {
          payment: true,
        },
        { new: true }
      );

      // clear user cart after payment verification
      await User.findByIdAndUpdate(userId, { cartData: {} });

      res.status(200).json({
        success: true,
        message: "Stripe payment verified",
        verifiedStripeOrder,
      });
    } else {
      const deletedStripeOrder = await Order.findByIdAndDelete(orderId);
      res.status(200).json({
        success: true,
        message: "Stripe order deleted",
        deletedStripeOrder,
      });
    }
  } catch (error) {
    console.error("Unable to verify stripe order: ", error);
    res
      .status(500)
      .json({ success: false, message: "Unable to verify stripe order" });
  }
};

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
    console.log(orderId, orderStatus);
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
  verifyStripePayment,
  PlaceOrderRazorpay,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
};
