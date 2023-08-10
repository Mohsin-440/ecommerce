const dotenv = require('dotenv');
const express = require("express");
const app = express();
const dbConn = require('./db/conn');
dotenv.config();

//Routers imports
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');
const cartRouter = require('./routes/cart');
const authRouter = require('./routes/auth');



app.use(express.json());

//routers
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/order",orderRouter);
app.use("/api/cart",cartRouter);


//DATABASE connection
dbConn(process.env.DB_CONNECTION);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));