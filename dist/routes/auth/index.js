import { Router } from "express";
import { authController } from "controllers/index.js";
import { adminOnly, authMiddleware } from "middleware/auth.js";
const express = Router();
express.post("/register", authController.register);
express.post("/login", authController.login);
express.get("/", authMiddleware, adminOnly, authController.getUsers); // Admin only later
export default express;
