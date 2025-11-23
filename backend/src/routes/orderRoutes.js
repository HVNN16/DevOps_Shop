// import express from "express";
// import {
//   createOrder,
//   getMyOrders,
//   getOrderById,
//   getAllOrders,   // ✅ thêm dòng này
// } from "../controllers/orderController.js";
//
// import authMiddleware from "../middlewares/auth_middleware.js";
//
// const router = express.Router();
// // ✅ Route cho admin xem toàn bộ đơn hàng
// router.get("/all", authMiddleware, getAllOrders);
// // Chỉ người dùng có token mới được thao tác
// router.post("/", authMiddleware, createOrder);
// router.get("/", authMiddleware, getMyOrders);
// router.get("/:id", authMiddleware, getOrderById);
//
//
//
// export default router;
import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import authMiddleware from "../middlewares/auth_middleware.js";

const router = express.Router();

// 🧾 Người dùng tạo đơn hàng
router.post("/", authMiddleware, createOrder);

// 👑 Admin xem toàn bộ đơn hàng (⚠️ phải đặt trước :id)
router.get("/all", authMiddleware, getAllOrders);

// 👤 Người dùng xem đơn của chính mình
router.get("/", authMiddleware, getMyOrders);

// 🔍 Xem chi tiết đơn hàng
router.get("/:id", authMiddleware, getOrderById);

// 🔄 Cập nhật trạng thái đơn hàng
router.put("/:id/status", authMiddleware, updateOrderStatus);

export default router;
