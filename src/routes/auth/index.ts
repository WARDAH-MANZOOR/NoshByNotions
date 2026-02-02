import { Router } from "express";
import { authController } from "controllers/index.js";
const express = Router();

express.post("/register", authController.register);
express.post("/login", authController.login);
express.get("/", authController.getUsers); // Admin only later

export default express;
