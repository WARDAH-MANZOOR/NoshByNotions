import prisma from "../../prisma/client.js";
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
export const createOrder = async (userId, address, phone) => {
    const cart = await prisma.cart.findUnique({
        where: { userId },
        include: { items: { include: { product: true } } }
    });
    if (!cart || cart.items.length === 0)
        throw new Error("Cart empty");
    const total = cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
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
export const getOrderTracking = async (orderId) => {
    return prisma.orderStatusLog.findMany({
        where: { orderId },
        orderBy: { createdAt: "asc" }
    });
};
const STATUS_FLOW = [
    "Pending",
    "Preparing",
    "On the way",
    "Delivered"
];
export const updateOrderStatus = async (orderId, newStatus) => {
    const order = await prisma.order.findUnique({
        where: { id: orderId }
    });
    if (!order) {
        throw new Error("Order not found");
    }
    // Delivered ke baad change allowed nahi
    if (order.status === "Delivered") {
        throw new Error("Order already delivered");
    }
    // Cancelled special case
    if (newStatus === "Cancelled") {
        await prisma.order.update({
            where: { id: orderId },
            data: { status: "Cancelled" }
        });
        await prisma.orderStatusLog.create({
            data: { orderId, status: "Cancelled" }
        });
        return;
    }
    const currentIndex = STATUS_FLOW.indexOf(order.status);
    const newIndex = STATUS_FLOW.indexOf(newStatus);
    if (newIndex !== currentIndex + 1) {
        throw new Error("Invalid status flow");
    }
    // update order
    await prisma.order.update({
        where: { id: orderId },
        data: { status: newStatus }
    });
    // auto log insert
    await prisma.orderStatusLog.create({
        data: {
            orderId,
            status: newStatus
        }
    });
};
export const getMyOrders = async (userId) => {
    return prisma.order.findMany({
        where: { userId },
        include: {
            items: {
                include: { product: true }
            }
        },
        orderBy: { createdAt: "desc" }
    });
};
export default {
    getAllOrders,
    createOrder,
    getOrderTracking,
    updateOrderStatus,
    getMyOrders
};
