import express from "express";
import { getProducts, createProduct,getProductById } from "../controllers/product_controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProductById); 

export default router;
