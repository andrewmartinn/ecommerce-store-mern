import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(400).json({
        success: false,
        message: "Not Authorized to access requested resource",
      });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedToken.email !== process.env.ADMIN_EMAIL) {
      return res.status(400).json({
        success: false,
        message: "Not Authorized to access requested resource",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default adminAuth;
