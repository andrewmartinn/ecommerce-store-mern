import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    console.log(token);

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Not Authorized to access requested resource",
      });
    }

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
