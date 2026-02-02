import { categoryService } from "../../services/index.js";
export const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const createCategory = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.json(category);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const updateCategory = async (req, res) => {
    try {
        const category = await categoryService.updateCategory(parseInt(req.params.id), req.body);
        res.json(category);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const deleteCategory = async (req, res) => {
    try {
        await categoryService.deleteCategory(parseInt(req.params.id));
        res.json({ message: "Category deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export default {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
};
