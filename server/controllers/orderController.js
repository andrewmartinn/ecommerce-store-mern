import Order from "../models/orderModel.js ";
import User from "../models/userModel.js";
import Stripe from "stripe";

// global checkout variables
const currency = "usd";
const deliveryCharges = 10;

// initialize stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

// Stripe webhook endpoint
const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // verify webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (error) {
    console.error("Webhook signature verification failed: ", error);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  // process stripe event
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      console.log("payment_intent.succeeded: ", paymentIntent);

      // update order status in DB
      const orderId = paymentIntent.metadata.order_id;

      try {
        const updatedOrder = await Order.findByIdAndUpdate(
          orderId,
          { payment: true },
          { new: true }
        );

        console.log("updatedOrder", updatedOrder);

        if (updatedOrder) {
          console.log(`Order ${orderId} updated`);
        } else {
          console.log(`Order ${orderId} not found`);
        }

        return res.status(200).json({ received: true });
      } catch (error) {
        console.error("Error updating order payment status:", error);
        return res.status(500).json({ error: "Error updating order" });
      }
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      console.log("payment_intent.payment_failed: ", paymentIntent);

      // delete order record on DB
      const orderId = paymentIntent.metadata.order_id;

      try {
        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (deletedOrder) {
          console.log("Payment failed order successfully removed from DB");
        } else {
          console.log("");
        }

        return res.status(200).json({ received: true });
      } catch (error) {
        console.error("Error deleting failed order:", error);
        return res.status(500).json({ error: "Error deleting order" });
      }
    }

    default: {
      console.log(`Unhandled event type: ${event.type}`);
      return res.status(200).json({ received: true });
    }
  }
};

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

    console.log("lineItems", line_items);

    // create checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/verify?success=true&orderId=${newStripeOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newStripeOrder._id}`,
      metadata: {
        order_id: newStripeOrder._id.toString(),
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
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  handleStripeWebhook,
};
