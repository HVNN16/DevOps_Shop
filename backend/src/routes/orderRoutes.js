import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
} from "../controllers/orderController.js";

import authMiddleware from "../middlewares/auth_middleware.js";

const router = express.Router();

// Chỉ người dùng có token mới được thao tác
router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getMyOrders);
router.get("/:id", authMiddleware, getOrderById);

export default router;
