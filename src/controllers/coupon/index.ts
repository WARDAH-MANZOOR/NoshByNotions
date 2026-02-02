import { Request, Response } from "express";
import {couponService} from "../../services/index.js";
export const getAllCoupons = async (req: Request, res: Response) => {
  try {
    const coupons = await couponService.getAllCoupons();
    res.json(coupons);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createCoupon = async (req: Request, res: Response) => {
  try {
    const coupon = await couponService.createCoupon(req.body);
    res.json(coupon);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCoupon = async (req: Request, res: Response) => {
  try {
    const coupon = await couponService.updateCoupon(parseInt(req.params.id), req.body);
    res.json(coupon);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCoupon = async (req: Request, res: Response) => {
  try {
    await couponService.deleteCoupon(parseInt(req.params.id));
    res.json({ message: "Coupon deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const applyCoupon = async (req: Request, res: Response) => {
  const { code, total } = req.body;
  const result = await couponService.applyCoupon(code, total);
  res.json(result);
};

export default{
    getAllCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    applyCoupon
    
}