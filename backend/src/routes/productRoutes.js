import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

// ✅ Public test routes (bỏ token tạm thời)
router.get('/', getProducts);          // xem danh sách
router.get('/:id', getProductById);    // xem chi tiết
router.post('/', createProduct);       // thêm sản phẩm
router.put('/:id', updateProduct);     // sửa sản phẩm
router.delete('/:id', deleteProduct);  // xóa sản phẩm

export default router;
