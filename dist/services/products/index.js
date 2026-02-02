import prisma from "../../prisma/client.js";
export const getAllProducts = async () => {
    return await prisma.product.findMany({
        include: { category: true },
    });
};
export const getProductById = async (id) => {
    return await prisma.product.findUnique({
        where: { id },
        include: { category: true },
    });
};
export const createProduct = async (data) => {
    return await prisma.product.create({
        data: {
            ...data,
        },
        include: { category: true },
    });
};
export const updateProduct = async (id, data) => {
    return await prisma.product.update({
        where: { id },
        data: { ...data },
        include: { category: true },
    });
};
export const deleteProduct = async (id) => {
    return await prisma.product.delete({ where: { id } });
};
export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
