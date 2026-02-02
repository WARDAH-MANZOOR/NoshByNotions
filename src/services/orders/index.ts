
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

// export const createOrder = async (data: OrderInput) => {
//   // Calculate total
//   let total = 0;
//   for (const item of data.items) {
//     const product = await prisma.product.findUnique({ where: { id: item.productId } });
//     if (product) total += product.price * item.quantity;
//   }

//   return await prisma.order.create({
//     data: {
//       userId: data.userId,
//       address: data.address,
//       phone: data.phone,
//       total,
//       items: {
//         create: data.items.map((i) => ({
//           productId: i.productId,
//           quantity: i.quantity,
//         })),
//       },
//     },
//     include: { items: true },
//   });
// };
export const createOrder = async (userId: number, address: string, phone: string) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } }
  });

  if (!cart || cart.items.length === 0) throw new Error("Cart empty");

  const total = cart.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const order = await prisma.order.create({
    data: {
      userId,
      address,
      phone,
      totalAmount: total,
      items: {
        create: cart.items.map(i => ({
          productId: i.productId,
          price: i.product.price,
          quantity: i.quantity
        }))
      },
      statusLogs: {
        create: { status: "Pending" }
      }
    }
  });

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  return order;
};
export const getOrderTracking = async (orderId: number) => {
  return prisma.orderStatusLog.findMany({
    where: { orderId },
    orderBy: { createdAt: "asc" }
  });
};

export default{
    getAllOrders,
    createOrder,
    getOrderTracking

}