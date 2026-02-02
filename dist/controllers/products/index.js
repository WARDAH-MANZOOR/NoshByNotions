import { productService } from "../../services/index.js";
export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(parseInt(req.params.id));
        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(parseInt(req.params.id), req.body);
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(parseInt(req.params.id));
        res.json({ message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export default {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};
