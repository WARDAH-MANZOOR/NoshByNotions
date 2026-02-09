import { adminOnly, authMiddleware } from "middleware/auth.js";
import { orderController } from "../../controllers/index.js";
import { Router } from "express";
const express = Router();
express.get("/", authMiddleware, adminOnly, orderController.getOrders); // Admin view
express.post("/", authMiddleware, orderController.createOrder); // User order
express.get("/tracking/:id", authMiddleware, orderController.trackOrder); // Track order status
// admin
express.put("/:id/status", authMiddleware, adminOnly, orderController.updateStatus);
express.get("/my-orders", authMiddleware, orderController.getMyOrders);
export default express;
