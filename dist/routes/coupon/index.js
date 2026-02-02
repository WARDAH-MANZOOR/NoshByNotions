import { couponController } from "../../controllers/index.js";
import { Router } from "express";
const express = Router();
express.get("/", couponController.getAllCoupons);
express.post("/", couponController.createCoupon);
express.put("/:id", couponController.updateCoupon);
express.delete("/:id", couponController.deleteCoupon);
export default express;
