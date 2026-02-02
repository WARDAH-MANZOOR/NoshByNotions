import { categoryController } from "../../controllers/index.js";
import { Router } from "express";
const express = Router();
express.get("/", categoryController.getAllCategories);
express.post("/", categoryController.createCategory);
express.put("/:id", categoryController.updateCategory);
express.delete("/:id", categoryController.deleteCategory);
export default express;
