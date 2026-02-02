import { userService } from "../../services/index.js";
export const registerUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.json({ message: "User created", user });
    }
    catch (error) {
        res.status(500).json({ error: "Cannot create user" });
    }
};
export default {
    registerUser
};
