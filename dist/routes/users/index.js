import { Router } from "express";
import { userController } from "controllers/index.js";
const express = Router();
express.post("/register", userController.register);
express.post("/login", userController.login);
express.get("/", userController.getUsers); // Admin only later
export default express;
