
import prisma from "../../prisma/client.js";

interface OrderItemInput {
  productId: number;
  quantity: number;
}

interface OrderInput {
  userId: number;
  items: OrderItemInput[];
  address: string;
  phone: string;
}

export const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: { items: { include: { product: true } }, user: true },
  });
};

export const createOrder = async (data: OrderInput) => {
  // Calculate total
  let total = 0;
  for (const item of data.items) {
    const product = await prisma.product.findUnique({ where: { id: item.productId } });
    if (product) total += product.price * item.quantity;
  }

  return await prisma.order.create({
    data: {
      userId: data.userId,
      address: data.address,
      phone: data.phone,
      total,
      items: {
        create: data.items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
      },
    },
    include: { items: true },
  });
};

export default{
    getAllOrders,
    createOrder

}