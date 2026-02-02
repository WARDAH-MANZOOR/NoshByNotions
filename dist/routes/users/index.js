import { Router } from "express";
import { userController } from "controllers/index.js";
const express = Router();
express.post("/register", userController.registerUser);
export default express;
