import mongoose from "mongoose";
import { toSlug } from "../utils/toSlug.js";

const variantSchema = new mongoose.Schema(
  {
    color: { type: String, trim: true },
    storage: { type: String, trim: true }, // ví dụ: "128GB", "256GB"
    ram: { type: String, trim: true }, // ví dụ: "8GB", "12GB"
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    sku: { type: String, trim: true }, // tuỳ chọn quản lý kho
    images: [{ type: String }],
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    brand: { type: String, required: true, trim: true }, // Apple, Samsung, Xiaomi...
    model: { type: String, trim: true }, // iPhone 15, S24, 13T...
    description: { type: String },
    basePrice: { type: Number, required: true, min: 0 }, // giá niêm yết cơ bản
    discountPercent: { type: Number, min: 0, max: 100, default: 0 },
    variants: { type: [variantSchema], default: [] }, // biến thể
    averageRating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    isActive: { type: Boolean, default: true },
    specs: {
      screen: String, // 6.1" OLED 120Hz...
      chipset: String, // A17 Pro, Snapdragon 8 Gen 3...
      battery: String, // 4000mAh
      camera: String, // 48MP...
      os: String, // iOS 18, Android 15
      others: mongoose.Schema.Types.Mixed,
    },
    images: [{ type: String }], // ảnh tổng (không theo biến thể)
  },
  { timestamps: true }
);

// Virtual giá sau giảm
productSchema.virtual("finalPrice").get(function () {
  const discount = Math.round(
    (this.basePrice * (this.discountPercent || 0)) / 100
  );
  return this.basePrice - discount;
});

// Tạo slug tự động
productSchema.pre("save", function (next) {
  if (!this.slug && this.name) {
    const brandPart = this.brand ? `${this.brand}-` : "";
    this.slug = toSlug(
      `${brandPart}${this.name}-${this.model || ""}-${Date.now()}`
    );
  }
  next();
});

/**
 * Index tối ưu truy vấn:
 * - brand + isActive: lọc theo hãng
 * - text index: tìm kiếm theo name/model/brand (đơn giản)
 * - price sort: dùng basePrice + discount để sort phía app hoặc pipeline
 */
productSchema.index({ brand: 1, isActive: 1 });
productSchema.index({ name: "text", brand: "text", model: "text" });

export default mongoose.model("Product", productSchema);
