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
export const applyCoupon = async (code: string, total: number) => {
  const coupon = await prisma.coupon.findUnique({ where: { code } });

  if (!coupon || !coupon.isActive) throw new Error("Invalid coupon");
  if (coupon.expiryDate < new Date()) throw new Error("Expired coupon");

  return {
    discountedTotal: total - (total * coupon.discount) / 100,
    discount: coupon.discount
  };
};

export default{
    getAllCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    applyCoupon
}