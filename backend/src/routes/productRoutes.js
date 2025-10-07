import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import authMiddleware from '../middlewares/auth_middleware.js';

const router = express.Router();

// Public test routes
router.get('/', getProducts);          // xem danh sách
router.get('/:id', getProductById);    // xem chi tiết

// Private
router.post('/', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
