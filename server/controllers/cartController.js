import User from "../models/userModel.js";

// add products to user cart
const addProductToCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { itemId, itemSize } = req.body;

    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found to add items" });
    }

    // extract user cart
    let cartData = await foundUser.cartData;

    // item exists increase quantity
    if (cartData[itemId]) {
      if (cartData[itemId][itemSize]) {
        cartData[itemId][itemSize] += 1;
      } else {
        cartData[itemId][itemSize] = 1;
      }
    } else {
      // add new entry for item
      cartData[itemId] = { [itemSize]: 1 };
    }

    Object.keys(cartData).forEach((productId) => {
      const sizes = cartData[productId];
      const emptySizes = Object.values(sizes).every((qty) => qty === 0);
      if (emptySizes) {
        delete cartData[productId];
      }
    });

    const AddedItems = await User.findByIdAndUpdate(userId, { cartData });

    res
      .status(200)
      .json({ success: true, message: "Added item to cart", AddedItems });
  } catch (error) {
    console.error("Error adding item to user cart: ", error);
    res
      .status(500)
      .json({ success: true, message: "Error adding item to user cart" });
  }
};

// update items in user cart
const updateCartItems = async (req, res) => {
  try {
    const { userId } = req.user;
    const { itemId, itemSize, itemQuantity } = req.body;

    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found to update items" });
    }

    // extract user cart
    let cartData = await foundUser.cartData;

    // update item quantity
    cartData[itemId][itemSize] = itemQuantity;

    Object.keys(cartData).forEach((productId) => {
      const sizes = cartData[productId];
      const emptySizes = Object.values(sizes).every((qty) => qty === 0);
      if (emptySizes) {
        delete cartData[productId];
      }
    });

    const updatedCartData = await User.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Updated cart item quantity",
      updatedCartData,
    });
  } catch (error) {
    console.error("Error updating cart", error);
    res.status(500).json({ success: false, message: "Error updating cart" });
  }
};

// get user cart data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.user;

    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found to get cart data" });
    }

    let cartData = await foundUser.cartData;

    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.error("Error getting user cart data: ", error);
    res
      .status(500)
      .json({ success: false, message: "Error getting user cart data" });
  }
};

export { addProductToCart, updateCartItems, getUserCart };
