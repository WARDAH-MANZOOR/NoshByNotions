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
export default {
    getAllCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon
};
