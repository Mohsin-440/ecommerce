import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConn from "./db/conn.js";
import { applyRouterMiddlewares } from "./app.use.router.middleware.js";
import cookieParser from "cookie-parser"


const app = express();


app.use(express.json());
app.use(cookieParser());

applyRouterMiddlewares(app)


//DATABASE connection
dbConn(process.env.DB_CONNECTION);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
