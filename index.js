import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConn from "./db/conn.js";
dbConn(process.env.DB_CONNECTION);

//Routers imports
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js"
import productRouter from "./routes/product.js"
import orderRouter from "./routes/order.js"
import cartRouter from "./routes/cart.js"


const app = express();


app.use(express.json());

//routers
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

//DATABASE connection

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
