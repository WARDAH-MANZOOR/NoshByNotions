import { Request, Response } from "express";
import {orderService} from "../../services/index.js";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Cannot fetch orders" });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Cannot create order" });
  }
};
export const trackOrder = async (req: Request, res: Response) => {
  const logs = await orderService.getOrderTracking(Number(req.params.id));
  res.json(logs);
};

export default{
    getOrders,
    createOrder,
    trackOrder

}