import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// 🛒 Lấy giỏ hàng của người dùng hiện tại
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product", "name brand variants");
    if (!cart) return res.status(200).json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ khi lấy giỏ hàng", error: err.message });
  }
};

// ➕ Thêm sản phẩm vào giỏ
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, variant, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    // Kiểm tra tồn kho (nếu có biến thể)
    const variantItem = product.variants.find(
      v =>
        v.color === variant.color &&
        v.storage === variant.storage &&
        v.ram === variant.ram
    );

    if (!variantItem) return res.status(400).json({ message: "Biến thể không tồn tại" });
    if (variantItem.stock < quantity) return res.status(400).json({ message: "Sản phẩm không đủ tồn kho" });

    // Tìm giỏ hàng của user
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Kiểm tra xem sản phẩm này đã có trong giỏ chưa
    const existingItem = cart.items.find(
      i =>
        i.product.toString() === productId &&
        i.variant.color === variant.color &&
        i.variant.storage === variant.storage &&
        i.variant.ram === variant.ram
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        nameSnapshot: product.name,
        imageSnapshot: product.images?.[0],
        variant,
        priceAtAdd: variantItem.price,
        quantity,
      });
    }

    await cart.save();
    res.status(200).json({ message: "Đã thêm vào giỏ hàng", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi máy chủ khi thêm vào giỏ hàng", error: err.message });
  }
};

// 📝 Cập nhật số lượng sản phẩm trong giỏ
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId, quantity } = req.body;
    if (!itemId) return res.status(400).json({ message: "Thiếu itemId" });

    // <= 0 thì coi như xóa
    if (quantity <= 0) {
      const cart = await Cart.findOneAndUpdate(
        { user: userId },
        { $pull: { items: { _id: itemId } } },
        { new: true }
      );
      if (!cart) return res.status(404).json({ message: "Chưa có giỏ hàng" });
      return res.json({ message: "Đã xóa sản phẩm khỏi giỏ", cart });
    }

    // cập nhật quantity bằng positional operator
    const cart = await Cart.findOneAndUpdate(
      { user: userId, "items._id": itemId },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    );

    if (!cart) return res.status(404).json({ message: "Không tìm thấy sản phẩm trong giỏ" });
    res.json({ message: "Cập nhật giỏ hàng thành công", cart });
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ khi cập nhật giỏ hàng", error: err.message });
  }
};

// ❌ Xóa theo itemId (atomic)
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.body;
    if (!itemId) return res.status(400).json({ message: "Thiếu itemId" });

    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { _id: itemId } } },
      { new: true }
    );

    if (!cart) return res.status(404).json({ message: "Chưa có giỏ hàng hoặc không tìm thấy sản phẩm" });
    res.json({ message: "Đã xóa sản phẩm khỏi giỏ", cart });
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ khi xóa sản phẩm", error: err.message });
  }
};
