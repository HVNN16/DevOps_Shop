import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from "../controllers/cartController.js";

import authMiddleware from "../middlewares/auth_middleware.js";

const router = express.Router();

// ✅ Tất cả các route đều yêu cầu token
router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.put("/update", authMiddleware, updateCartItem);
router.delete("/remove", authMiddleware, removeFromCart);

export default router;
