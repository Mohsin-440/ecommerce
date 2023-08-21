import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConn from "./db/conn.js";
import { applyRouterMiddlewares } from "./app.use.router.middleware.js";
import cookieParser from "cookie-parser"
import { fileURLToPath } from 'url';
import path from "path";
import cors from "cors";
const app = express();

const __filename = fileURLToPath(import.meta.url);
export const __rootFolder = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))
applyRouterMiddlewares(app)


//DATABASE connection
dbConn(process.env.DB_CONNECTION);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
