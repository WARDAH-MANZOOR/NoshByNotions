import prisma from "../../prisma/client.js";
export const getAllCoupons = async () => {
    return await prisma.coupon.findMany();
};
export const createCoupon = async (data) => {
    return await prisma.coupon.create({ data });
};
export const updateCoupon = async (id, data) => {
    return await prisma.coupon.update({ where: { id }, data });
};
export const deleteCoupon = async (id) => {
    return await prisma.coupon.delete({ where: { id } });
};
export const applyCoupon = async (code, total) => {
    const coupon = await prisma.coupon.findUnique({ where: { code } });
    if (!coupon || !coupon.isActive)
        throw new Error("Invalid coupon");
    if (coupon.expiryDate < new Date())
        throw new Error("Expired coupon");
    return {
        discountedTotal: total - (total * coupon.discount) / 100,
        discount: coupon.discount
    };
};
export default {
    getAllCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    applyCoupon
};
