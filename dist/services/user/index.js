import prisma from "../../prisma/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
        data: {
            ...data,
            password: hashedPassword,
        },
    });
    return user;
};
export const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        throw new Error("User not found");
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
        throw new Error("Invalid credentials");
    // JWT Token
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });
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
