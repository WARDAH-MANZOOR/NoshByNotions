import prisma from "../../prisma/client.js";
export const getAllCategories = async () => {
    return await prisma.category.findMany({ include: { products: true } });
};
export const createCategory = async (data) => {
    return await prisma.category.create({ data });
};
export const updateCategory = async (id, data) => {
    return await prisma.category.update({ where: { id }, data });
};
export const deleteCategory = async (id) => {
    return await prisma.category.delete({ where: { id } });
};
export default {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
};
