import prisma from "../../prisma/client.js";

interface ProductInput {
  name: string;
  description?: string;
  price: number;
  image?: string;
}

export const getAllProducts = async () => {
  return await prisma.product.findMany();
};

export const createProduct = async (data: ProductInput) => {
  return await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
    },
  });
};

export default{
    getAllProducts,
    createProduct

}