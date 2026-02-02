import { Request, Response } from "express";
import {productService} from "../../services/index.js";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Cannot create product" });
  }
};



export default{
    getAllProducts,
    createProduct

}