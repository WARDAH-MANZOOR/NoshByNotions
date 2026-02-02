import { userService } from "../../services/index.js";
export const register = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.json({ message: "User registered successfully", user });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userService.loginUser(email, password);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
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
