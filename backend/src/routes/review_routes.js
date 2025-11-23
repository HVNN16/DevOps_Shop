import express from "express";
import {
  createOrUpdateReview,
  getProductReviews,
} from "../controllers/reviewController.js";
import authMiddleware from "../middlewares/auth_middleware.js";

const router = express.Router();

// Tạo / cập nhật review cho 1 sản phẩm (cần đăng nhập)
router.post(
  "/:productId",
  (req, res, next) => {
    console.log("🔥 ROUTER HIT — POST /reviews/:productId");
    next();
  },
  authMiddleware,
  createOrUpdateReview
);

// Lấy danh sách review của 1 sản phẩm (public)
router.get("/product/:productId", getProductReviews);

export default router;
