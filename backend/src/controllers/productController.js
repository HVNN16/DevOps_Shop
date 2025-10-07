import Product from '../models/Product.js';
import mongoose from 'mongoose';

// ✅ Lấy danh sách sản phẩm (tìm kiếm + lọc + phân trang)
export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 8, brand, search, sortBy = 'createdAt', order = 'desc' } = req.query;

    const filter = {};
    if (brand) filter.brand = brand;
    if (search) filter.$text = { $search: search }; // dùng text index

    const sortOptions = { [sortBy]: order === 'asc' ? 1 : -1 };

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
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Lấy chi tiết sản phẩm theo ID hoặc slug
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = mongoose.isValidObjectId(id)
      ? await Product.findById(id)
      : await Product.findOne({ slug: id });

    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Thêm mới sản phẩm (chỉ admin)
export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data', error: err.message });
  }
};

// ✅ Cập nhật sản phẩm (chỉ admin)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Invalid update data' });
  }
};

// ✅ Xóa sản phẩm (chỉ admin)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
