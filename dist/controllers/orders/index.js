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
        const userId = req.user.id; // JWT middleware se
        const { address, phone } = req.body;
        const order = await orderService.createOrder(userId, address, phone);
        res.json(order);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const trackOrder = async (req, res) => {
    const logs = await orderService.getOrderTracking(Number(req.params.id));
    res.json(logs);
};
export const updateStatus = async (req, res) => {
    const orderId = Number(req.params.id);
    const { status } = req.body;
    await orderService.updateOrderStatus(orderId, status);
    res.json({ message: "Order status updated" });
};
export const getMyOrders = async (req, res) => {
    const orders = await orderService.getMyOrders(req.user.id);
    res.json(orders);
};
export default {
    getOrders,
    createOrder,
    trackOrder,
    updateStatus,
    getMyOrders
};
