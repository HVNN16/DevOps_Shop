import express from "express";
import { getWishlist, toggleWishlist } from "../controllers/wishlistController.js";
import authMiddleware from "../middlewares/auth_middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getWishlist);
router.post("/:productId", authMiddleware, toggleWishlist);

export default router;
