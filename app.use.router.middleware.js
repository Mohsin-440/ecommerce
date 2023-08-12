import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js"
import orderRouter from "./routes/order.js"
import cartRouter from "./routes/cart.js";
import categoryRouter from "./routes/categories.js";

export function applyRouterMiddlewares(app) {
    
    app.use("/api/categories", categoryRouter);
    app.use("/api/user", userRouter);
    app.use("/api/product", productRouter);
    app.use("/api/cart", cartRouter);
    app.use("/api/order", orderRouter);
}