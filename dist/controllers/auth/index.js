import { authService } from "../../services/index.js";
export const register = async (req, res) => {
    const { name, email, password, phone, address } = req.body;
    const data = await authService.registerUser(name, email, password, phone, address);
    res.json(data);
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    const data = await authService.loginUser(email, password);
    res.json(data);
};
export const getUsers = async (req, res) => {
    try {
        const users = await authService.getAllUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Cannot fetch users" });
    }
};
export default {
    register,
    login,
    getUsers
};
