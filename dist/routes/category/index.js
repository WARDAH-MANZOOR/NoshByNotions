import { adminOnly, authMiddleware } from "middleware/auth.js";
import { categoryController } from "../../controllers/index.js";
import { Router } from "express";
const express = Router();
express.get("/", categoryController.getAllCategories);
express.post("/", authMiddleware, adminOnly, categoryController.createCategory);
express.put("/:id", authMiddleware, adminOnly, categoryController.updateCategory);
express.delete("/:id", authMiddleware, adminOnly, categoryController.deleteCategory);
export default express;
