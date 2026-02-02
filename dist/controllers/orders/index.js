import { orderService } from "../../services/index.js";
export const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: "Cannot fetch orders" });
    }
};
export const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body);
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ error: "Cannot create order" });
    }
};
export default {
    getOrders,
    createOrder
};
