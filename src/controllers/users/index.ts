import { Request, Response } from "express";
import { userService } from "../../services/index.js";


export const register = async (req: Request, res: Response) => {
  try {
    const user = await userService.registerUser(req.body);
    res.json({ message: "User registered successfully", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: "Cannot fetch users" });
  }
};

export default{
    register,
    login,
    getUsers

}