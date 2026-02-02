import prisma from "../../prisma/client.js";

export const getCart = async (userId: number) => {
  return prisma.cart.findUnique({
    where: { userId },
    include: {
      items: { include: { product: true } }
    }
  });
};

export const addItem = async (userId: number, productId: number, quantity: number) => {
  const cart = await prisma.cart.upsert({
    where: { userId },
    update: {},
    create: { userId }
  });

  return prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId
      }
    },
    update: { quantity: { increment: quantity } },
    create: { cartId: cart.id, productId, quantity }
  });
};

export const updateItem = async (itemId: number, quantity: number) => {
  return prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity }
  });
};

export const removeItem = async (itemId: number) => {
  return prisma.cartItem.delete({ where: { id: itemId } });
};

export const clearCart = async (userId: number) => {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) return;

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
};
export default{
    addItem,
    getCart,
    updateItem,
    removeItem,
    clearCart
    
}