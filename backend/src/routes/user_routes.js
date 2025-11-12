import express from "express";
import authMiddleware from "../middlewares/auth_middleware.js";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user_controller.js";

const router = express.Router();

// ✅ CRUD routes
router.get("/", authMiddleware, getUsers);
router.post("/", authMiddleware, createUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
