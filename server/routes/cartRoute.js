import express from "express";
import {
  addProductToCart,
  getUserCart,
  updateCartItems,
} from "../controllers/cartController.js";
import authUser from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.get("/", authUser, getUserCart);
cartRouter.post("/add", authUser, addProductToCart);
cartRouter.patch("/update", authUser, updateCartItems);

export default cartRouter;
