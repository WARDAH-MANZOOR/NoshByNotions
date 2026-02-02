
import { Request, Response } from "express";
import { cartService } from "../../services/index.js";


export const getCart = async (req: Request, res: Response) => {
  const cart = await cartService.getCart(req.user.id);
  res.json(cart);
};

export const addItem = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const item = await cartService.addItem(req.user.id, productId, quantity);
  res.json(item);
};

export const updateItem = async (req: Request, res: Response) => {
  const { itemId, quantity } = req.body;
  const item = await cartService.updateItem(itemId, quantity);
  res.json(item);
};

export const removeItem = async (req: Request, res: Response) => {
  await cartService.removeItem(Number(req.params.id));
  res.json({ message: "Item removed" });
};

export const clearCart = async (req: Request, res: Response) => {
  await cartService.clearCart(req.user.id);
  res.json({ message: "Cart cleared" });
};
export default{
    addItem,
    getCart,
    updateItem,
    removeItem,
    clearCart

}