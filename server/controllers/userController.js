import User from "../models/userModel.js";
import validator from "validator";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    const isPasswordMatch = await bycrpt.compare(password, foundUser.password);

    if (isPasswordMatch) {
      const token = createToken(foundUser._id);
      res.status(200).json({ success: true, token });
    } else {
      res.status(400).json({
        success: false,
        message: "Email or password doesn't match",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 8 characters long",
      });
    }

    // hash user password
    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(password, salt);

    // create new user account on DB
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // generate JWT token
    const token = createToken(newUser._id);

    res.status(201).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginAdmin = async (req, res) => {};

export { loginUser, registerUser, loginAdmin };
