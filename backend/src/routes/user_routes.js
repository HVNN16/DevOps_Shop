import express from "express";
import User from "../models/user_model.js";
import authMiddleware from "../middlewares/auth_middleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

export default router;
