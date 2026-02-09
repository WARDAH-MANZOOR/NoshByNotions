import { Application } from "express";
// import autoCashin from "./payin/index.js"
import products from "./products/index.js"
import orders from "./orders/index.js"
import user from "./auth/index.js"
import category from "./category/index.js";
import coupon from "./coupon/index.js";
import cart from "./cart/index.js";

import express from "express";

export default function (app: Application) {
    // app.use("/api/cashin", autoCashin);
    app.use("/api/products", products);
    app.use("/api/orders", orders);
    app.use("/api/user", user);
    app.use("/api/category", category);
    app.use("/api/coupon", coupon);
    app.use("/api/cart", cart);
   
}