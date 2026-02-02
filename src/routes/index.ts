import { Application } from "express";
// import autoCashin from "./payin/index.js"
import products from "./products/index.js"
import orders from "./orders/index.js"
import user from "./users/index.js"
import category from "./category/index.js";

import express from "express";

export default function (app: Application) {
    // app.use("/api/cashin", autoCashin);
    app.use("/api/products", products);
    app.use("/api/orders", orders);
    app.use("/api/user", user);
    app.use("/api/category", category);
   
}