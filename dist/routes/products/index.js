import { productController } from "../../controllers/index.js";
import { Router } from "express";
const express = Router();
express.get("/", productController.getAllProducts);
express.post("/", productController.createProduct);
export default express;
