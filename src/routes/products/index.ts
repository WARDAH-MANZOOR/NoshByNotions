
import { authMiddleware,adminOnly } from "middleware/auth.js";
import { productController } from "../../controllers/index.js";
import { Router } from "express";

const express = Router();

express.get("/", productController.getAllProducts);
express.post("/", authMiddleware, adminOnly, productController.createProduct)
express.get("/:id", productController.getProductById);
express.put("/:id", authMiddleware, adminOnly, productController.updateProduct);
express.delete("/:id", authMiddleware, adminOnly, productController.deleteProduct);    




export default express;
