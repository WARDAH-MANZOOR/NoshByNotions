import { couponService } from "../../services/index.js";
export const getAllCoupons = async (req, res) => {
    try {
        const coupons = await couponService.getAllCoupons();
        res.json(coupons);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const createCoupon = async (req, res) => {
    try {
        const coupon = await couponService.createCoupon(req.body);
        res.json(coupon);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const updateCoupon = async (req, res) => {
    try {
        const coupon = await couponService.updateCoupon(parseInt(req.params.id), req.body);
        res.json(coupon);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const deleteCoupon = async (req, res) => {
    try {
        await couponService.deleteCoupon(parseInt(req.params.id));
        res.json({ message: "Coupon deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const applyCoupon = async (req, res) => {
    const { code, total } = req.body;
    const result = await couponService.applyCoupon(code, total);
    res.json(result);
};
export default {
    getAllCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    applyCoupon
};
