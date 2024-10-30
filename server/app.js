import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";

const app = express();

connectDB();
connectCloudinary();

// middlewares
app.use(cors());
app.use(express.json());

// api endpoints
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
