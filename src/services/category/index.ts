import prisma from "../../prisma/client.js";

interface CategoryInput {
  name: string;
}

export const getAllCategories = async () => {
  return await prisma.category.findMany({ include: { products: true } });
};

export const createCategory = async (data: CategoryInput) => {
  return await prisma.category.create({ data });
};

export const updateCategory = async (id: number, data: Partial<CategoryInput>) => {
  return await prisma.category.update({ where: { id }, data });
};

export const deleteCategory = async (id: number) => {
  return await prisma.category.delete({ where: { id } });
};


export default{
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
}