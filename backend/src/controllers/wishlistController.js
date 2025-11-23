import mongoose from "mongoose";
import User from "../models/user_model.js";
import Product from "../models/Product.js";

// 📌 Lấy danh sách wishlist
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    console.log("🔥 GET wishlist for user:", userId);

    const user = await User.findById(userId).populate("wishlist");

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy user" });
    }

    console.log("🔥 Wishlist populated:", user.wishlist);

    res.json(user.wishlist || []);
  } catch (err) {
    console.error("🔥 Wishlist error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// 📌 Thêm hoặc xóa sản phẩm khỏi wishlist (Toggle)
export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id || req.user.id;

    console.log("🔥 TOGGLE wishlist:", { userId, productId });

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy user" });
    }

    // Kiểm tra product ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Product ID không hợp lệ" });
    }

    const existsIndex = user.wishlist.findIndex(
      (id) => id.toString() === productId
    );

    if (existsIndex > -1) {
      // Xóa sản phẩm nếu đã có
      user.wishlist.splice(existsIndex, 1);
      await user.save();
      console.log("✅ Đã xóa khỏi wishlist");
      return res.json({ 
        message: "Đã xóa khỏi danh sách yêu thích", 
        inWishlist: false 
      });
    } else {
      // Kiểm tra sản phẩm tồn tại
      const productExists = await Product.findById(productId);
      if (!productExists) {
        return res.status(404).json({ message: "Sản phẩm không tồn tại" });
      }

      // Thêm vào wishlist
      user.wishlist.push(new mongoose.Types.ObjectId(productId));
      await user.save();
      console.log("✅ Đã thêm vào wishlist");
      return res.json({ 
        message: "Đã thêm vào danh sách yêu thích", 
        inWishlist: true 
      });
    }
  } catch (err) {
    console.error("🔥 Toggle wishlist error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// 📌 XÓA sản phẩm khỏi wishlist (DELETE endpoint riêng)
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id || req.user.id;

    console.log("🔥 REMOVE from wishlist:", { userId, productId });

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy user" });
    }

    // Kiểm tra product ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Product ID không hợp lệ" });
    }

    // Xóa sản phẩm khỏi wishlist
    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== productId
    );

    await user.save();
    console.log("✅ Đã xóa khỏi wishlist");

    return res.json({ 
      message: "Đã xóa khỏi danh sách yêu thích", 
      inWishlist: false 
    });
  } catch (err) {
    console.error("🔥 Remove wishlist error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};