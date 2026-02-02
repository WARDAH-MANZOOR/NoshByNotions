// import autoCashin from "./payin/index.js"
import products from "./products/index.js";
import orders from "./orders/index.js";
import user from "./users/index.js";
export default function (app) {
    // app.use("/api/cashin", autoCashin);
    app.use("/api/products", products);
    app.use("/api/orders", orders);
    app.use("/api/user", user);
}
