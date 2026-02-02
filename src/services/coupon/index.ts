import prisma from "../../prisma/client.js";

interface CouponInput {
  code: string;
  discount: number;
  expiryDate: Date;
}

export const getAllCoupons = async () => {
  return await prisma.coupon.findMany();
};

export const createCoupon = async (data: CouponInput) => {
  return await prisma.coupon.create({ data });
};

export const updateCoupon = async (id: number, data: Partial<CouponInput>) => {
  return await prisma.coupon.update({ where: { id }, data });
};

export const deleteCoupon = async (id: number) => {
  return await prisma.coupon.delete({ where: { id } });
};

export default{
    getAllCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon
}