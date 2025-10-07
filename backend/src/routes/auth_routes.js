import express from "express";
import * as authCtrl from "../controllers/auth_controller.js";
import authMiddleware from "../middlewares/auth_middleware.js";

const router = express.Router();

// Đăng ký
router.post("/register", authCtrl.register);

// Đăng nhập
router.post("/login", authCtrl.login);

// Lấy thông tin user hiện tại
router.get("/me", authMiddleware, authCtrl.getProfile);

export default router;
