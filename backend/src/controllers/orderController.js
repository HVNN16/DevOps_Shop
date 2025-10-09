import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// 🧾 Tạo đơn hàng mới
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { address, phone, paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Giỏ hàng trống!" });

    // Trừ tồn kho
    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (!product) continue;

      const variant = product.variants.find(
        (v) =>
          v.color === item.variant.color &&
          v.storage === item.variant.storage &&
          v.ram === item.variant.ram
      );

      if (!variant) continue;
      if (variant.stock < item.quantity)
        return res.status(400).json({
          message: `Sản phẩm ${product.name} không đủ tồn kho.`,
        });

      variant.stock -= item.quantity;
      await product.save();
    }

    // Tính tổng tiền
    const total = cart.items.reduce(
      (sum, i) => sum + i.priceAtAdd * i.quantity,
      0
    );

    // Tạo đơn hàng
    const newOrder = await Order.create({
      user: userId,
      items: cart.items.map((i) => ({
        product: i.product,
        nameSnapshot: i.nameSnapshot,
        imageSnapshot: i.imageSnapshot,
        variant: i.variant,
        priceAtOrder: i.priceAtAdd,
        quantity: i.quantity,
      })),
      totalAmount: total,
      address,
      phone,
      paymentMethod,
    });

    // Xóa giỏ hàng sau khi đặt
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Đặt hàng thành công!",
      order: newOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Lỗi máy chủ khi tạo đơn hàng",
      error: err.message,
    });
  }
};

// 📦 Lấy danh sách đơn hàng của người dùng
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách đơn hàng" });
  }
};

// 👁️ Xem chi tiết 1 đơn hàng
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("items.product", "name");
    if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};
