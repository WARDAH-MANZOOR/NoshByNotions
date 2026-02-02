import { productController } from "../../controllers/index.js";
import { Router } from "express";
const express = Router();
express.get("/", productController.getAllProducts);
express.post("/", productController.createProduct);
express.get("/:id", productController.getProductById);
express.put("/:id", productController.updateProduct);
express.delete("/:id", productController.deleteProduct);
export default express;
