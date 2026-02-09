import prisma from "../../prisma/client.js";


interface ProductInput {
  name: string;
  description?: string;
  price: number;
  image?: string;
  categoryId: number;
}

export const getAllProducts = async () => {
  return await prisma.product.findMany({
    include: { category: true },
  });
};

export const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
};

export const createProduct = async (data: ProductInput) => {
  return await prisma.product.create({
    data: {
      ...data,
    },
    include: { category: true },
  });
};

export const updateProduct = async (id: number, data: Partial<ProductInput>) => {
  return await prisma.product.update({
    where: { id },
    data: { ...data },
    include: { category: true },
  });
};

export const deleteProduct = async (id: number) => {
  return await prisma.product.delete({ where: { id } });
};

export default{
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}