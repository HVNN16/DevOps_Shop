import express from "express";
import authMiddleware from "../middlewares/auth_middleware.js";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateProfile,
  changePassword,
} from "../controllers/user_controller.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);
router.get("/", authMiddleware, getUsers);
router.post("/", authMiddleware, createUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
