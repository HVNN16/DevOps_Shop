import express from "express";
import { createMessage, getMessages } from "../controllers/messageController.js";
// import authMiddleware from "../middlewares/auth_middleware.js"; // nếu bạn muốn bảo vệ route admin

const router = express.Router();

// Khách hàng gửi tin nhắn
router.post("/", createMessage);

// Admin lấy danh sách tin nhắn (tuỳ chọn, có thể thêm middleware auth)
router.get("/", getMessages);

export default router;
