import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  nameSnapshot: { type: String, required: true },     // tên tại thời điểm thêm
  imageSnapshot: { type: String },                     // ảnh đại diện biến thể/sản phẩm
  variant: {
    color: { type: String, trim: true },
    storage: { type: String, trim: true },
    ram: { type: String, trim: true },
  },
  priceAtAdd: { type: Number, required: true, min: 0 }, // giá snapshot
  quantity: { type: Number, required: true, min: 1, default: 1 },
}, { timestamps: true });

cartItemSchema.virtual('subtotal').get(function () {
  return this.priceAtAdd * this.quantity;
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, unique: true, required: true },
  items: { type: [cartItemSchema], default: [] },
  // Có thể lưu coupon/voucher sau này
  note: { type: String, trim: true },
}, { timestamps: true });

// Virtual tổng tiền & tổng số lượng
cartSchema.virtual('grandTotal').get(function () {
  return this.items.reduce((sum, it) => sum + (it.priceAtAdd * it.quantity), 0);
});
cartSchema.virtual('totalQty').get(function () {
  return this.items.reduce((sum, it) => sum + it.quantity, 0);
});

/**
 * Index:
 * - user unique: mỗi user 1 giỏ
 * - items.product: hỗ trợ truy vấn/đồng bộ tồn kho (phân tích sau)
 */
cartSchema.index({ user: 1 }, { unique: true });
cartSchema.index({ 'items.product': 1 });

export default mongoose.model('Cart', cartSchema);
