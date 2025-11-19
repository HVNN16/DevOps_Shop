// import Order from "../models/Order.js";
// import Cart from "../models/Cart.js";
// import Product from "../models/Product.js";
//
// // 🧾 Tạo đơn hàng mới
// export const createOrder = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { address, phone, paymentMethod } = req.body;
//
//     const cart = await Cart.findOne({ user: userId });
//     if (!cart || cart.items.length === 0)
//       return res.status(400).json({ message: "Giỏ hàng trống!" });
//
//     // Trừ tồn kho
//     for (const item of cart.items) {
//       const product = await Product.findById(item.product);
//       if (!product) continue;
//
//       const variant = product.variants.find(
//           (v) =>
//               v.color === item.variant.color &&
//               v.storage === item.variant.storage &&
//               v.ram === item.variant.ram
//       );
//
//       if (!variant) continue;
//       if (variant.stock < item.quantity)
//         return res.status(400).json({
//           message: `Sản phẩm ${product.name} không đủ tồn kho.`,
//         });
//
//       variant.stock -= item.quantity;
//       await product.save();
//     }
//
//     // Tính tổng tiền
//     const total = cart.items.reduce(
//         (sum, i) => sum + i.priceAtAdd * i.quantity,
//         0
//     );
//
//     // Tạo đơn hàng
//     const newOrder = await Order.create({
//       user: userId,
//       items: cart.items.map((i) => ({
//         product: i.product,
//         nameSnapshot: i.nameSnapshot,
//         imageSnapshot: i.imageSnapshot,
//         variant: i.variant,
//         priceAtOrder: i.priceAtAdd,
//         quantity: i.quantity,
//       })),
//       totalAmount: total,
//       address,
//       phone,
//       paymentMethod,
//     });
//
//     // Xóa giỏ hàng sau khi đặt
//     cart.items = [];
//     await cart.save();
//
//     res.status(201).json({
//       message: "Đặt hàng thành công!",
//       order: newOrder,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: "Lỗi máy chủ khi tạo đơn hàng",
//       error: err.message,
//     });
//   }
// };
//
// // 📦 Lấy danh sách đơn hàng của người dùng
// export const getMyOrders = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: "Lỗi khi lấy danh sách đơn hàng" });
//   }
// };
//
// // 👁️ Xem chi tiết 1 đơn hàng
// export const getOrderById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const order = await Order.findById(id).populate("items.product", "name");
//     if (!order)
//       return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
//     res.json(order);
//   } catch (err) {
//     res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
//   }
// };
//
// // 🧾 Lấy toàn bộ đơn hàng (Admin)
// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find()
//         .populate("user", "name email")
//         .sort({ createdAt: -1 });
//
//     res.json(orders);
//   } catch (err) {
//     console.error("❌ Lỗi khi lấy toàn bộ đơn hàng:", err);
//     res.status(500).json({ message: "Lỗi khi lấy toàn bộ đơn hàng" });
//   }
// };
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
        return res
          .status(400)
          .json({ message: `Sản phẩm ${product.name} không đủ tồn kho.` });

      variant.stock -= item.quantity;
      await product.save();
    }

    const total = cart.items.reduce(
      (sum, i) => sum + i.priceAtAdd * i.quantity,
      0
    );

    // Tạo đơn mới
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
      paymentMethod, // ⚠ Nếu muốn dùng VNPay -> phải thêm enum trong model
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({ message: "Đặt hàng thành công!", order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Lỗi máy chủ khi tạo đơn hàng",
      error: err.message,
    });
  }
};

// 📦 Lấy đơn của user
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy đơn hàng" });
  }
};

// 🔍 Xem 1 đơn
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.product",
      "name"
    );
    if (!order)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// 👑 Admin lấy toàn bộ đơn hàng
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi lấy toàn bộ đơn hàng" });
  }
};

// 🔄 Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Khớp với model Order.js
    const validStatuses = ["pending", "paid", "shipped", "delivered", "cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Trạng thái không hợp lệ!" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Cập nhật trạng thái thành công!", order });
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật trạng thái:", error);
    res.status(500).json({ message: "Lỗi server khi cập nhật trạng thái" });
  }
};
