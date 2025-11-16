// src/routes/order_pay.js
import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

const router = express.Router();

router.post("/create-vnpay-order", async (req, res) => {
  try {
    const { address, phone, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // Lấy giỏ hàng của user
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Giỏ hàng trống" });
    }

    // Chuyển đổi item -> đúng format Order
    const items = cart.items.map((item) => ({
      product: item.product._id,
      nameSnapshot: item.nameSnapshot,
      imageSnapshot: item.imageSnapshot,
      variant: item.variant,
      priceAtOrder: item.priceAtAdd,  // Giá tại thời điểm đặt
      quantity: item.quantity,
    }));

    // Tính tổng tiền
    const totalAmount = items.reduce(
      (sum, i) => sum + i.priceAtOrder * i.quantity,
      0
    );

    // Tạo đơn hàng pending
    const newOrder = await Order.create({
      user: userId,
      items,
      address,
      phone,
      totalAmount,
      status: "pending",
      paymentMethod: "VNPay",
    });

    return res.json({
      success: true,
      orderId: newOrder._id,
      totalAmount,
    });

  } catch (err) {
    console.error("Create VNPay Order Error:", err);
    return res.status(500).json({
      success: false,
      message: "Không thể tạo đơn hàng",
      error: err.message,
    });
  }
});

export default router;
