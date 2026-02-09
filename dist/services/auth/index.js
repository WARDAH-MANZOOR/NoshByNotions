import prisma from "../../prisma/client.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/jwt.js";
export const registerUser = async (name, email, password, phone, address) => {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
        throw new Error("Email already exists");
    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
        data: { name, email, password: hashed, phone, address }
    });
    const token = generateToken({ id: user.id, role: user.role });
    return { user, token };
};
export const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        throw new Error("Invalid credentials");
    const match = await comparePassword(password, user.password);
    if (!match)
        throw new Error("Invalid credentials");
    const token = generateToken({ id: user.id, role: user.role });
    return { user, token };
};
export const getAllUsers = async () => {
    return await prisma.user.findMany({
        select: { id: true, name: true, email: true, phone: true, address: true, role: true, createdAt: true },
    });
};
export default {
    registerUser,
    loginUser,
    getAllUsers
};
