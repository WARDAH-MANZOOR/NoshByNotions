
import { orderController } from "../../controllers/index.js";
import { Router } from "express";

const express = Router();

express.get("/", orderController.getOrders); // Admin view
express.post("/", orderController.createOrder); // User order

export default express;
