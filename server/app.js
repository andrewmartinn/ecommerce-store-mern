import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// api endpoints
app.get("/", (req, res) => {
  res.send("Hello from backend");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
