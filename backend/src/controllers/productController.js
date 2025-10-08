import Product from "../models/Product.js";
import mongoose from "mongoose";

// ✅ Lấy danh sách sản phẩm (tìm kiếm + lọc + phân trang + khoảng giá)
export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 8,
      brand,
      search,
      sortBy = "createdAt",
      order = "desc",
      minPrice,
      maxPrice,
    } = req.query;

    const filter = {};

    // 🔹 Lọc theo thương hiệu (1 hoặc nhiều)
    if (brand) {
      const brandList = brand.split(",").map((b) => b.trim());
      filter.brand = { $in: brandList };
    }

    // 🔹 Tìm kiếm theo text (name, brand, model)
    if (search) {
      filter.$text = { $search: search };
    }

    // 🔹 Lọc theo khoảng giá
    if (minPrice || maxPrice) {
      filter.basePrice = {};
      if (minPrice) filter.basePrice.$gte = Number(minPrice);
      if (maxPrice) filter.basePrice.$lte = Number(maxPrice);
    }

    // 🔹 Sắp xếp
    const sortOptions = { [sortBy]: order === "asc" ? 1 : -1 };

    // 🔹 Truy vấn dữ liệu
    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      data: products,
      pagination: {
        total,
        page: Number(page),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("❌ Lỗi khi lấy danh sách sản phẩm:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Lấy chi tiết sản phẩm theo ID hoặc slug
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = mongoose.isValidObjectId(id)
      ? await Product.findById(id)
      : await Product.findOne({ slug: id });

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("❌ Lỗi khi lấy chi tiết sản phẩm:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Thêm mới sản phẩm (chỉ admin)
export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("❌ Lỗi khi tạo sản phẩm:", err);
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
};

// ✅ Cập nhật sản phẩm (chỉ admin)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (err) {
    console.error("❌ Lỗi khi cập nhật sản phẩm:", err);
    res.status(400).json({ message: "Invalid update data" });
  }
};

// ✅ Xóa sản phẩm (chỉ admin)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("❌ Lỗi khi xóa sản phẩm:", err);
    res.status(500).json({ message: "Server error" });
  }
};
